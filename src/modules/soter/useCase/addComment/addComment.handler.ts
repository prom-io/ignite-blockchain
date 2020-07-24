import {Injectable, Logger} from '@nestjs/common';
import {MapService} from '../../map.service';
import {ArchiveService} from '../../archive.service';
import {objectToBuffer} from '../../utils';
import {Command} from './command';

@Injectable()
// @ts-ignore
export class AddCommentHandler {
    private readonly logger = new Logger(AddCommentHandler.name);

    constructor(
        private readonly mapService: MapService,
        private readonly archiveService: ArchiveService,
    ) {
    }

    public async handle(command: Command): Promise<void> {
        const fileName = command.postId + '/comments.json';
        let allComments;
        try {
            const allCommentsBuffer = await this.archiveService.getFile(fileName);
            allComments = JSON.parse(allCommentsBuffer.toString());
        } catch (e) {
            allComments = {};
        }
        allComments[command.commentId] = command.data;
        await this.mapService.pushComment(command.commentId, command.postId, command.peerWallet, command.peerIp);
        await this.archiveService.addFile(objectToBuffer(allComments), fileName, fileName);
        this.logger.debug(`Comment with id ${command.commentId} success added!`);
    }
}
