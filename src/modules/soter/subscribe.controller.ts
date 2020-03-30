import {Body, Controller, Get, Param, Post, Res} from '@nestjs/common';
import {AddSubscribeHandler} from './useCase/addSubscribe/addSubscribe.handler';
import {Command as AddSubscribeCommand} from './useCase/addSubscribe/command';
import {Response} from 'express';
import {FileFetcher} from './fetchers/file.fetcher';

@Controller('/api/v1/subscribe')
export class SubscribeController {
    constructor(
        private readonly addSubscribeHandler: AddSubscribeHandler,
        private readonly fileFetcher: FileFetcher,
    ) {
    }

    @Post()
    public async addSubscribe(
        @Body('id') id: string,
        @Body('userId') userId: string,
        @Body('data') data: object,
        @Res() res: Response,
    ) {
        try {
            await this.addSubscribeHandler.handle(new AddSubscribeCommand(id, userId, data));
            return res.status(200).send({message: 'Subscribe success added!'});
        } catch (e) {
            return res.status(400).send({message: e.message});
        }
    }

    @Get('/:cid/:userId')
    public async getLikeByCommentId(@Param('cid') cid: string, @Param('userId') userId: string, @Res() res: Response) {
        try {
            const likes = await this.fileFetcher.getById(cid, userId + '/subscribes.json');
            return res.send(JSON.parse(likes.toString()));
        } catch (e) {
            return res.status(400).send({message: e.message});
        }
    }
}
