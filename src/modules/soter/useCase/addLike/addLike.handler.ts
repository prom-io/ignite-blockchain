import {Injectable, Logger} from '@nestjs/common';
import {Command} from './command';
import {ArchiveService} from '../../archive.service';
import {MapService} from '../../map.service';

@Injectable()
export class AddLikeHandler {
    private readonly logger = new Logger(AddLikeHandler.name);

    constructor(
        private readonly mapService: MapService,
        private readonly archiveService: ArchiveService,
    ) {}

    public async handle(command: Command) {
        // const entitiesMap = await this.archiveService.getEntitiesInArchive();
        const lastHash = await this.mapService.getLastHash();
        const fileName = command.commentId + '/likes.json';
        let allLikes;
        try {
            const allLikesBuffer = await this.archiveService.getFile(fileName);
            allLikes = JSON.parse(allLikesBuffer.toString());
        } catch (e) {
            allLikes = {};
        }

        // @ts-ignore
        // const likes = lastHash.entityMap.likes ?? [];

        if (!lastHash.entityMapLikes.likes) {
            // @ts-ignore
            lastHash.entityMapLikes.likes = [];
        }

        // @ts-ignore
        lastHash.entityMapLikes.likes.push({commentId: command.commentId, id: command.id});
        await lastHash.save();
        this.logger.debug(lastHash.entityMapLikes);
        allLikes[command.id] = command.data;
        return await this.archiveService.addFile(
            Buffer.from(JSON.stringify(allLikes)),
            fileName,
            fileName,
        );
    }
}
