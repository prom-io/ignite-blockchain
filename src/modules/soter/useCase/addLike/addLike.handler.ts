import {Injectable} from '@nestjs/common';
import {Command} from './command';
import {ArchiveService} from '../../archive.service';
import {MapService} from '../../map.service';

@Injectable()
export class AddLikeHandler {
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
        const likes = lastHash.entityMap.likes ?? [];
        likes.push({commentId: command.commentId, id: command.id});
        // @ts-ignore
        lastHash.entityMap.likes = likes;
        await lastHash.save();
        console.log(lastHash.entityMap);
        allLikes[command.id] = command.data;
        return await this.archiveService.addFile(
            Buffer.from(JSON.stringify(allLikes)),
            lastHash.entityMap,
            fileName,
            fileName,
        );
    }
}
