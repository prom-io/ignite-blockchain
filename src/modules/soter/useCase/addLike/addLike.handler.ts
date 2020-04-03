import {Injectable} from '@nestjs/common';
import {Command} from './command';
import {ArchiveService} from '../../archive.service';

@Injectable()
export class AddLikeHandler {
    constructor(private readonly archiveService: ArchiveService) {
    }

    public async handle(command: Command) {
        const entitiesMap = await this.archiveService.getEntitiesInArchive();
        let allLikes;
        try {
            const allLikesBuffer = await this.archiveService.getFileInZip(command.commentId + '/likes.json');
            allLikes = JSON.parse(allLikesBuffer.toString());
        } catch (e) {
            allLikes = {};
        }
        const likes = entitiesMap.likes ?? [];
        likes.push({commentId: command.commentId, id: command.id});
        entitiesMap.likes = likes;
        const fileName = command.commentId + '/likes.json';
        allLikes[command.id] = command.data;
        return await this.archiveService.addFile(
            Buffer.from(JSON.stringify(allLikes)),
            entitiesMap,
            fileName,
            fileName,
            [fileName],
        );
    }
}
