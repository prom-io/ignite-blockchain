import {Injectable} from '@nestjs/common';
import {Command} from './command';
import {ArchiveService} from '../../archive.service';
import {MapService} from '../../map.service';
// tslint:disable-next-line:no-var-requires
const FileType = require('file-type');

@Injectable()
export class UploadHandler {
    constructor(
        private readonly mapService: MapService,
        private readonly archiveService: ArchiveService,
    ) {}

    public async handle(command: Command): Promise<void> {
        // const jsonMap = await this.archiveService.getMapInArchive();
        // const entitiesMap = await this.archiveService.getEntitiesInArchive();
        // if (command.id in jsonMap) {
        //     throw new Error('Id exists!');
        // }
        const lastHash = await this.mapService.getLastHash();
        // @ts-ignore
        const images = lastHash.entityMap.images ?? [];
        images.push(command.id);
        // @ts-ignore
        lastHash.entityMap.images = Array.from(new Set(images));
        await lastHash.save();
        const fileType = await FileType.fromBuffer(command.file.buffer);
        await this.archiveService.addFile(
            command.file.buffer,
            lastHash.entityMap,
            command.id,
            command.id + '.' + fileType.ext,
        );
    }
}
