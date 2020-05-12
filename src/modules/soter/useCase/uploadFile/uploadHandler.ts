import {Injectable, Logger} from '@nestjs/common';
import {Command} from './command';
import {ArchiveService} from '../../archive.service';
import {MapService} from '../../map.service';
import {SyncTime} from '../../../../model/syncTime.entity';
// tslint:disable-next-line:no-var-requires
const FileType = require('file-type');
import {objectToBuffer, fileNameGenerate} from '../../utils';

@Injectable()
export class UploadHandler {
    private readonly logger = new Logger(UploadHandler.name);

    constructor(
        private readonly mapService: MapService,
        private readonly archiveService: ArchiveService,
    ) {
    }

    public async handle(command: Command): Promise<void> {
        try {
            const fileBuffer = Buffer.from(command.file.buffer.data);
            const fileType = await FileType.fromBuffer(fileBuffer);
            const fileName = fileNameGenerate(command.id, fileType.ext);
            await this.mapService.pushFile(command.id, command.peerWallet, command.peerIp);
            await this.archiveService.addFile(fileBuffer, command.id, fileName);
        } catch (e) {
            this.logger.error(e.message);
            throw e;
        }
    }
}
