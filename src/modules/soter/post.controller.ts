import {Body, Controller, Get, Param, Post, Res} from '@nestjs/common';
import {AddPostHandler} from './useCase/addPost/addPost.handler';
import {Command as AddPostCommand} from './useCase/addPost/command';
import {Response} from 'express';
import {FileFetcher} from './fetchers/file.fetcher';

@Controller('/api/v1/post')
export class PostController {
    constructor(
        private readonly addPostHandler: AddPostHandler,
        private readonly fileFetcher: FileFetcher,
    ) {}

    @Post()
    public async addPost(
        @Body('id') id: string,
        @Body('peerWallet') peerWallet: string,
        @Body('peerIp') peerIp: string,
        @Body('data') data: object,
        @Res() res: Response,
    ) {
        try {
            await this.addPostHandler.handle(new AddPostCommand(id, peerWallet, peerIp, data));
            return res.status(200).send({message: 'Post success added!'});
        } catch (e) {
            return res.status(400).send({message: e.message});
        }
    }

    @Get('/:cid/:id')
    public async getPostById(@Param('cid') cid: string, @Param('id') id: string, @Res() res: Response) {
        try {
            const post = await this.fileFetcher.getById(cid, id);
            return res.send(JSON.parse(post.toString()));
        } catch (e) {
            return res.status(400).send({message: e.message});
        }
    }
}
