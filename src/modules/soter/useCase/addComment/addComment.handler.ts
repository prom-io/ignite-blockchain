import {Injectable, Logger} from '@nestjs/common';
import {ArchiveService} from '../../archive.service';
import {Command} from './command';
import {SyncTime} from '../../../../model/syncTime.entity';
import {MapService} from '../../map.service';

@Injectable()
export class AddCommentHandler {
    private readonly logger = new Logger(AddCommentHandler.name);

    constructor(
        private readonly mapService: MapService,
        private readonly archiveService: ArchiveService,
    ) {}

    public async handle(command: Command) {
        // const jsonMap = await this.archiveService.getMapInArchive();
        // const entitiesMap = await this.archiveService.getEntitiesInArchive();
        // if (command.id in jsonMap) {
        //     throw new Error('Id exists!');
        // }
        const lastHash = await this.mapService.getLastHash();
        // @ts-ignore
        if (!lastHash.entityMapPosts.posts) {
            // @ts-ignore
            lastHash.entityMapPosts.posts = [];
        }

        // const posts = lastHash.entityMap.posts ?? [];
        // posts.push(command.id);
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
