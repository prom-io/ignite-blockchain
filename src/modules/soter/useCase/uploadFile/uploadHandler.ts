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
        const entitiesMap = await this.archiveService.getEntitiesInArchive();
        if (command.id in jsonMap) {
            throw new Error('Id exists!');
        }
        const images = entitiesMap.images ?? [];
        images.push(command.id);
        entitiesMap.images = images;

        const fileType = await FileType.fromBuffer(command.file.buffer);
        await this.archiveService.fileToArchive(
            command.file.buffer,
            entitiesMap,
            command.id,
            command.id + '.' + fileType.ext,
        );
    }
}
