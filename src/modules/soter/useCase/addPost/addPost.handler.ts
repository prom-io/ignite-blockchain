import {Injectable, Logger} from '@nestjs/common';
import {ArchiveService} from '../../archive.service';
import {Command} from './command';
import {SyncTime} from '../../../../model/syncTime.entity';
import {MapService} from '../../map.service';

@Injectable()
export class AddPostHandler {
    private readonly logger = new Logger(AddPostHandler.name);

    constructor(
        private readonly mapService: MapService,
        private readonly archiveService: ArchiveService,
    ) {}

    public async handle(command: Command) {
        const lastHash = await this.mapService.getLastHash();
        // @ts-ignore
        if (!lastHash.entityMapPosts.posts) {
            // @ts-ignore
            lastHash.entityMapPosts.posts = [];
        }
        // @ts-ignore
        lastHash.entityMapPosts.posts.push(command.id); // = Array.from(new Set(posts));
        await lastHash.save();
        this.logger.debug(lastHash.entityMapPosts);
        const jsonData = JSON.stringify(command.data);
        const fileBuffer = Buffer.from(jsonData);
        return await this.archiveService.addFile(
            fileBuffer,
            command.id,
            command.id + '.json',
        );
    }
}
