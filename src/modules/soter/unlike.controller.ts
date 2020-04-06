import {RemoveLikeHandler} from './useCase/removeLike/removeLike.handler';
import {Command as RemoveLikeCommand} from './useCase/removeLike/command';
import {FileFetcher} from './fetchers/file.fetcher';
import {Body, Controller, Get, Param, Post, Res} from '@nestjs/common';
import {Response} from 'express';

@Controller('/api/v1/unlike')
export class UnlikeController {
    constructor(
        private readonly removeLikeHandler: RemoveLikeHandler,
        private readonly fileFetcher: FileFetcher,
    ) {}

    @Post('/')
    public async addUnlike(
        @Body('id') id: string,
        @Body('commentId') commentId: string,
        @Body('peerWallet') peerWallet: string,
        @Body('peerIp') peerIp: string,
        @Body('data') data: object,
        @Res() res: Response,
    ) {
        await this.removeLikeHandler.handle(
            new RemoveLikeCommand(id, commentId, peerWallet, peerIp, data),
        );
        return res.status(200).send({message: 'Unlike success added!'});
    }
}
