import {Injectable} from '@nestjs/common';
import {Command} from './command';
import {ArchiveService} from '../../archive.service';
// tslint:disable-next-line:no-var-requires
const FileType = require('file-type');

@Injectable()
export class UploadHandler {
    constructor(private readonly archiveService: ArchiveService) {}

    public async handle(command: Command): Promise<void> {
        const jsonMap = await this.archiveService.getMapInArchive();
        if (command.id in jsonMap) {
            throw new Error('Id exists!');
        }
        const fileType = await FileType.fromBuffer(command.file.buffer);
        await this.archiveService.fileToArchive(
            command.file.buffer,
            command.id,
            command.id + '.' + fileType.ext,
        );
    }
}
