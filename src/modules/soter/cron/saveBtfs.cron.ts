import {Injectable, Logger} from '@nestjs/common';
import {Cron} from '@nestjs/schedule';
import {SoterService} from '../soter.service';
import {ArchiveService} from '../archive.service';
import * as fs from 'fs';
import {SyncTime} from '../../../model/syncTime.entity';
import {ConfigService} from '../../../config/config.service';
import {MapService} from '../map.service';
import AdmZip = require('adm-zip');
import {CidStorageService} from '../../contracts/cidStorage.service';
import {TelegramService} from 'nestjs-telegram';
import {TelegramDebugService} from '../services/telegramDebug.service';
import {CidBlockService} from '../../contracts/cidBlock.service';
import {IgniteNodeService} from '../services/igniteNode.service';

@Injectable()
export class SaveBtfsCron {
    private readonly logger = new Logger(SaveBtfsCron.name);

    constructor(
        private readonly soterService: SoterService,
        private readonly archiveService: ArchiveService,
        private readonly configService: ConfigService,
        private readonly mapService: MapService,
        private readonly cidBlockService: CidBlockService,
        private readonly telegramDebugService: TelegramDebugService,
        private readonly igniteNodeService: IgniteNodeService,
    ) {
    }

    @Cron('* * * * *', {
        name: 'sync',
    })
    async handleCronSync() {
        try {
            const syncTimes = await SyncTime.findAllNotSynced();
            await this.mapService.create();
            for (const syncTime of syncTimes) {
                this.logger.debug('===================== START SYNC =====================');
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

                if (Object.keys(syncTime.fileMap).length === 0) {
                    await syncTime.remove();
                    continue;
                }

                if (fs.existsSync(dirPath)) {
                    admZip.addLocalFolder(dirPath, '');
                }

                admZip.addFile('map.json', Buffer.from(JSON.stringify(syncTime.fileMap)));
                admZip.addFile('entities.json', Buffer.from(JSON.stringify(entityMap)));
                admZip.writeZip(zipPath);
                if (!fs.existsSync(zipPath)) {
                    continue;
                }
                const file = fs.readFileSync(zipPath);
                this.logger.debug('Sync started!');
                await this.telegramDebugService.sendMessage('Sync started!');
                const soterResult = await this.soterService.add(file, syncTime.hash + '.zip');
                if (!soterResult.data.cid || soterResult.data.cid === '') {
                    await this.telegramDebugService.sendMessage('Error: Cid empty in btfs response!');
                    throw new Error('Cid empty!');
                }
                const responseIgniteNode = await this.igniteNodeService.sendCid(soterResult.data.cid);

                this.logger.debug('Zip file to Btfs saved!');
                const tx = await this.cidBlockService.submitBlock(soterResult.data.cid);
                syncTime.synced = true;
                syncTime.btfsCid = soterResult.data.cid;
                await syncTime.save();
                this.logger.debug(tx);
                this.logger.debug('Soter data: ' + JSON.stringify(soterResult.data));
                this.logger.debug('Ignite node response status: ' + String(responseIgniteNode.status));
                this.logger.debug('Sync completed!');
                await this.telegramDebugService.sendMessage('Sync completed! Soter CID: ' + JSON.stringify(soterResult.data));
                this.logger.debug('===================== END SYNC =====================');
            }
        } catch (e) {
            this.logger.error(e.message);

            if (e.status === 400) {
                await this.telegramDebugService.sendMessage('Error: ' + e.response.body.data);
                this.logger.error(e.response.body.data);
            }
        }
    }
}
