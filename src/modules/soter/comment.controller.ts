import {Controller} from '@nestjs/common';
import {AddCommentHandler} from './useCase/addComment/addComment.handler';
import {Command as AddCommentCommand} from './useCase/addComment/command';
import {FileFetcher} from './fetchers/file.fetcher';
import {Ctx, KafkaContext, MessagePattern, Payload} from '@nestjs/microservices';
@Controller()
export class CommentController {
    constructor(private readonly addCommentHandler: AddCommentHandler) {}

    @MessagePattern('ignite.comments.add')
    public async createComment(@Payload() message: any, @Ctx() context: KafkaContext) {
        const value = message.value;
        await this.addCommentHandler.handle(
            new AddCommentCommand(
                value.commentId,
                value.postId,
                value.peerWallet,
                value.peerIp,
                value.data
            ),
        );
        return {message: 'Comment success added WORK!!!!'};
    }
}
