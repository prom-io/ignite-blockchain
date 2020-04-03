import {Injectable, Logger} from '@nestjs/common';
import {Command} from './command';
import {ArchiveService} from '../../archive.service';
import {MapService} from '../../map.service';
import {SyncTime} from '../../../../model/syncTime.entity';
// tslint:disable-next-line:no-var-requires
const FileType = require('file-type');

@Injectable()
export class UploadHandler {
    private readonly logger = new Logger(UploadHandler.name);

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
        // const images = lastHash.entityMap.images ?? [];
        // images.push(command.id);

        const lastHash = await this.mapService.getLastHash();

        // @ts-ignore
        if (!lastHash.entityMapFiles.images) {
            // @ts-ignore
            lastHash.entityMapFiles.images = [];
        }
        // @ts-ignore
        lastHash.entityMapFiles.images.push(command.id); // = Array.from(new Set(images));
        await lastHash.save();
        this.logger.debug(lastHash.entityMapFiles);
        const fileType = await FileType.fromBuffer(command.file.buffer);
        await this.archiveService.addFile(
            command.file.buffer,
            command.id,
            command.id + '.' + fileType.ext,
        );
    }
}
