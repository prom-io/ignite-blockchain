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
import {CidChainService} from '../../contracts/binance/smartChain/cidChain.service';
import {ArweaveService} from '../../arweave/arweave.service';

@Injectable()
export class SaveBtfsCron {
    private readonly logger = new Logger(SaveBtfsCron.name);

    constructor(
        private readonly soterService: SoterService,
        private readonly arweaveService: ArweaveService,
        private readonly archiveService: ArchiveService,
        private readonly configService: ConfigService,
        private readonly mapService: MapService,
        private readonly cidBlockService: CidBlockService,
        private readonly telegramDebugService: TelegramDebugService,
        private readonly igniteNodeService: IgniteNodeService,
        private readonly cidChainService: CidChainService,
    ) {
    }

    @Cron('*/3 * * * *', {
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

                // if (Object.keys(syncTime.fileMap).length === 0) {
                //     await syncTime.remove();
                //     continue;
                // }

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
                // const soterResult = await this.soterService.add(file, syncTime.hash + '.zip');
                const arweaveResult = await this.arweaveService.add(file, syncTime.hash + '.zip');
                // if (!soterResult.data.cid || soterResult.data.cid === '') {
                //     await this.telegramDebugService.sendMessage('Error: Cid empty in btfs response!');
                //     throw new Error('Cid empty!');
                // }
                if(!arweaveResult.data.hash || arweaveResult.data.hash === '') {
                    await this.telegramDebugService.sendMessage('Error: Arweave save error!');
                    throw new Error('Arweave save error!');
                }

                const responseIgniteNode = await this.igniteNodeService.sendCid(arweaveResult.data.hash);

                this.logger.debug('Zip file to Btfs saved!');
                const tx = await this.cidBlockService.submitBlock(arweaveResult.data.hash);
                await this.cidChainService.pushBlock(arweaveResult.data.hash);
                syncTime.synced = true;
                // syncTime.btfsCid = soterResult.data.cid;
                syncTime.arweaveHash = arweaveResult.data.hash;
                await syncTime.save();
                this.logger.debug(tx);
                // this.logger.debug('Soter data: ' + JSON.stringify(soterResult.data));
                this.logger.debug('Arweave data: ' + JSON.stringify(arweaveResult.data));
                this.logger.debug('Ignite node response status: ' + String(responseIgniteNode.status));
                this.logger.debug('Sync completed!');
                await this.telegramDebugService.sendMessage('Sync completed! Arweave hash: ' + JSON.stringify(arweaveResult.data.hash));
                this.logger.debug('===================== END SYNC =====================');
            }
        } catch (e) {
            this.logger.error(e.message);
            await this.telegramDebugService.sendMessage('Error: ' + e.message);
            if (e.status === 400) {
                await this.telegramDebugService.sendMessage('Error: ' + e.response.body.data);
                this.logger.error(e.response.body.data);
            }
        }
    }
}
