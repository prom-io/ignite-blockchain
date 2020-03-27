import {Injectable, Logger} from '@nestjs/common';
import {Cron} from '@nestjs/schedule';
import {SoterService} from './soter.service';
import {ArchiveService} from './archive.service';
import * as fs from 'fs';
import {SyncTime} from '../../model/syncTime.entity';
@Injectable()
export class TasksService {
    private readonly logger = new Logger(TasksService.name);

    constructor(
        private readonly soterService: SoterService,
        private readonly archiveService: ArchiveService,
    ) {
    }

    @Cron('10 * * * * *')
    async handleCron() {
        const syncTime = await SyncTime.findLatestItem();
        try {
            if (syncTime && syncTime.synced === false) {
                const zipPath = await this.archiveService.zipPathGenerate();

                if (!fs.existsSync(zipPath)) {
                    throw new Error('Zip file not created!');
                }

                const zipName = await this.archiveService.getZipName();
                const file = fs.readFileSync(zipPath);
                const soterResult = await this.soterService.add(file, zipName);
                syncTime.synced = true;
                await syncTime.save();

                const lastHash = new SyncTime();
                // tslint:disable-next-line:new-parens
                lastHash.hash = ((+new Date) + Math.random() * 100).toString(32);
                lastHash.createdAt = new Date();
                await lastHash.save();

                this.logger.log('Soter data: ', JSON.stringify(soterResult.data));
                this.logger.log('Sync completed!');
            } else {
                this.logger.log('Sync not started!');
            }
        } catch (e) {
            this.logger.error(e.message);
        }
    }
}
