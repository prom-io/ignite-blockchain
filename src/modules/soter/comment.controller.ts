import {Body, Controller, Get, Param, Post, Res} from '@nestjs/common';
import {AddCommentHandler} from './useCase/addComment/addComment.handler';
import {Command as AddCommentCommand} from './useCase/addComment/command';
import {Response} from 'express';
import {FileFetcher} from './fetchers/file.fetcher';

@Controller('/v1/comment')
export class CommentController {
    constructor(
        private readonly addCommentHandler: AddCommentHandler,
        private readonly fileFetcher: FileFetcher,
    ) {}

    @Post()
    public async addComment(
        @Body('id') id: string,
        @Body('data') data: object,
        @Res() res: Response,
    ) {
        try {
            await this.addCommentHandler.handle(new AddCommentCommand(id, data));
            return res.status(200).send({message: 'Comment success added!'});
        } catch (e) {
            return res.status(400).send({message: e.message});
        }
    }

    @Get('/:cid/:id')
    public async getCommentById(@Param('cid') cid: string, @Param('id') id: string, @Res() res: Response) {
        const comment = await this.fileFetcher.getById(cid, id);
        return res.send(JSON.parse(comment.toString()));
    }
}
