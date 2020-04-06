import {Body, Controller, Post, Res} from '@nestjs/common';
import {Response} from 'express';
import {RemoveSubscribeHandler} from './useCase/removeSubscribe/removeSubscribe.handler';
import {FileFetcher} from './fetchers/file.fetcher';
import {Command as RemoveSubscribeCommand} from './useCase/removeSubscribe/command';

@Controller('/api/v1/unsubscribe')
export class UnsubscribeController {
    constructor(
        private readonly addUnsubscribeHandler: RemoveSubscribeHandler,
        private readonly fileFetcher: FileFetcher,
    ) {}

    @Post('/')
    public async addUnsubscribe(
        @Body('id') id: string,
        @Body('userId') userId: string,
        @Body('peerWallet') peerWallet: string,
        @Body('peerIp') peerIp: string,
        @Body('data') data: object,
        @Res() res: Response,
    ) {
        await this.addUnsubscribeHandler.handle(
            new RemoveSubscribeCommand(id, userId, peerWallet, peerIp, data),
        );
        return res.status(200).send({message: 'Unsubscribe success added!'});
    }
}
