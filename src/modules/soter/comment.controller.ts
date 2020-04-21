import {Body, Controller, Get, Param, Post, Res} from '@nestjs/common';
import {AddCommentHandler} from './useCase/addComment/addComment.handler';
import {Command as AddCommentCommand} from './useCase/addComment/command';
import {Response} from 'express';
import {FileFetcher} from './fetchers/file.fetcher';
import {Ctx, KafkaContext, MessagePattern, Payload} from '@nestjs/microservices';
@Controller('/api/v1/comment')
export class CommentController {
    constructor(
        private readonly addCommentHandler: AddCommentHandler,
        private readonly fileFetcher: FileFetcher,
    ) {}

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

    // @Post('/')
    // public async addComment(
    //     @Body('commentId') commentId: string,
    //     @Body('postId') postId: string,
    //     @Body('peerWallet') peerWallet: string,
    //     @Body('peerIp') peerIp: string,
    //     @Body('data') data: object,
    //     @Res() res: Response,
    // ) {
    //     await this.addCommentHandler.handle(
    //         new AddCommentCommand(commentId, postId, peerWallet, peerIp, data),
    //     );
    //     return res.status(200).send({message: 'Comment success added!'});
    // }
    //
    // @Get('/:cid/:postId')
    // public async getCommentsByPostId(@Param('cid') cid: string, @Param('postId') postId: string, @Res() res: Response) {
    //     try {
    //         const likes = await this.fileFetcher.getById(cid, postId + '/comments.json');
    //         return res.send(JSON.parse(likes.toString()));
    //     } catch (e) {
    //         return res.status(400).send({message: e.message});
    //     }
    // }
}
