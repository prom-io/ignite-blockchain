import {Injectable} from '@nestjs/common';
import {Command} from './command';
import {ArchiveService} from '../../archive.service';

@Injectable()
export class AddLikeHandler {
    constructor(private readonly archiveService: ArchiveService) {
    }

    public async handle(command: Command) {
        let allLikes;
        try {
            const allLikesBuffer = await this.archiveService.getFileByName(command.commentId + '/likes.json');
            allLikes = JSON.parse(allLikesBuffer.toString());
        } catch (e) {
            allLikes = {};
        }
        const fileName = command.commentId + '/likes.json';
        allLikes[command.id] = command.data;
        return await this.archiveService.archiveFile(
            Buffer.from(JSON.stringify(allLikes)),
            fileName,
            fileName,
            [fileName],
        );
    }
}
