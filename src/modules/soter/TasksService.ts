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

    @Cron('* * * * *')
    async handleCron() {
        const syncTime = await SyncTime.findLatestItem();
        const connection = getConnection();
        const queryRunner = connection.createQueryRunner();
        await queryRunner.startTransaction();
        try {
            if (syncTime && syncTime.synced === false) {
                const admZip = new AdmZip();
                const zipPath = `./files/${syncTime.hash}.zip`;
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
                admZip.addLocalFolder(await this.archiveService.generateDirPath(), '/');
                admZip.addFile('map.json', Buffer.from(JSON.stringify(syncTime.fileMap)));
                admZip.addFile('entities.json', Buffer.from(JSON.stringify(entityMap)));
                admZip.writeZip(zipPath);

                const file = fs.readFileSync(zipPath);
                this.logger.debug('Sync started!');
                const soterResult = await this.soterService.add(file, syncTime.hash + '.zip');

                if (!soterResult.data.cid || soterResult.data.cid === '') {
                    throw new Error('Cid empty!');
                }

                this.logger.debug('Zip file to Btfs saved!');
                const lastHash = new SyncTime();
                // tslint:disable-next-line:new-parens
                lastHash.hash = ((+new Date) + Math.random() * 100).toString(32);
                lastHash.createdAt = new Date();
                await lastHash.save();
                this.logger.debug('New zip file name generated!');
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
