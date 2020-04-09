import {Injectable, Logger} from '@nestjs/common';
import {ArchiveService} from '../../archive.service';
import {Command} from './command';
import {SyncTime} from '../../../../model/syncTime.entity';
import {MapService} from '../../map.service';
import { objectToBuffer, fileNameGenerate } from '../../utils';

@Injectable()
export class AddPostHandler {
    private readonly logger = new Logger(AddPostHandler.name);

    constructor(
        private readonly mapService: MapService,
        private readonly archiveService: ArchiveService,
    ) {}

    public async handle(command: Command) {
        try {
            const fileBuffer = objectToBuffer(command.data);
            const fileName = fileNameGenerate(command.id, 'json');
            await this.mapService.pushPost(command.id, command.peerWallet, command.peerIp);
            await this.archiveService.addFile(fileBuffer, command.id, fileName);
            this.logger.debug(`Post with id ${command.id} success saved!`);
        } catch (e) {
            this.logger.error(e.message);
            throw e;
        }
    }
}
