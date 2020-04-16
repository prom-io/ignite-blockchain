import {HttpService, Injectable, Logger} from '@nestjs/common';
import {Cron} from '@nestjs/schedule';
import {SoterService} from './soter.service';
import {ArchiveService} from './archive.service';
import * as fs from 'fs';
import {SyncTime} from '../../model/syncTime.entity';
import {ConfigService} from '../../config/config.service';
import {MapService} from './map.service';
import AdmZip = require('adm-zip');
import {CidStorageService} from '../contracts/cidStorage.service';
import {getConnection} from 'typeorm';

@Injectable()
export class TasksService {
    private readonly logger = new Logger(TasksService.name);

    constructor(
        private readonly soterService: SoterService,
        private readonly archiveService: ArchiveService,
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
        private readonly mapService: MapService,
        private readonly cidStorageService: CidStorageService,
    ) {
    }

    @Cron('* * * * *', {
        name: 'sync',
    })
    async handleCronSync() {
        this.logger.debug('===================== SYNC =====================');
        const syncTimes = await SyncTime.findAllNotSynced();
        await this.mapService.create();
        const connection = getConnection();
        const queryRunner = connection.createQueryRunner();
        await queryRunner.startTransaction();
        try {
            for (const syncTime of syncTimes) {
                console.log(1);
                const admZip = new AdmZip();
                const zipPath = `./files/${syncTime.hash}.zip`;
                const dirPath = this.archiveService.generateDirPath(syncTime.hash);
                const entityMap = Object.assign(
                    syncTime.entityMapFiles,
                    syncTime.entityMapSubscribes,
                    syncTime.entityMapLikes,
                    syncTime.entityMapPosts,
                    syncTime.entityMapUsers,
                    syncTime.entityMapUnLikes,
                    syncTime.entityMapUnSubscribes,
                    syncTime.entityMapComments,
                );
                console.log(1.1);
                if (fs.existsSync(dirPath)) {
                    admZip.addLocalFolder(dirPath, '');
                }
                admZip.addFile('map.json', Buffer.from(JSON.stringify(syncTime.fileMap)));
                admZip.addFile('entities.json', Buffer.from(JSON.stringify(entityMap)));
                admZip.writeZip(zipPath);
                console.log(1.3);
                if (!fs.existsSync(zipPath)) {
                    console.log(1.4);
                    continue;
                }
                const file = fs.readFileSync(zipPath);
                this.logger.debug('Sync started!');
                const soterResult = await this.soterService.add(file, syncTime.hash + '.zip');
                console.log(soterResult);
                console.log(soterResult.data);
                if (!soterResult.data.cid || soterResult.data.cid === '') {
                    throw new Error('Cid empty!');
                }

                this.logger.debug('Zip file to Btfs saved!');
                syncTime.synced = true;
                syncTime.btfsCid = soterResult.data.cid;
                await syncTime.save();
                const tx = await this.cidStorageService.setCid(soterResult.data.cid);
                this.logger.debug(tx);

                const responseIgniteNode = await this.httpService.post(this.configService.getIgniteNodeAddress() + '/api/v3/btfs', {
                    btfsCid: soterResult.data.cid,
                    peerWallet: this.configService.get('PEER_WALLET'),
                    peerIp: this.configService.get('PEER_IP'),
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).toPromise();
                await queryRunner.commitTransaction();
                this.logger.debug('Soter data: ' + JSON.stringify(soterResult.data));
                this.logger.debug('Ignite node response status: ' + String(responseIgniteNode.status));
                this.logger.debug('Sync completed!');
                // if (syncTime && syncTime.synced === false) {}
            }
        } catch (e) {
            await queryRunner.rollbackTransaction();
            this.logger.error(e.message);

            if (e.status === 400) {
                this.logger.error(e.response.body.data);
            }
        } finally {
            await queryRunner.release();
        }
    }
}
