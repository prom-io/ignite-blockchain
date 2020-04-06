import {Body, Controller, Get, Header, Param, Post, Res} from '@nestjs/common';
import {AddUserHandler} from './useCase/addUser/addUser.handler';
import {Command as AddUserCommand} from './useCase/addUser/command';
import {Response} from 'express';
import {FileFetcher} from './fetchers/file.fetcher';

@Controller('/api/v1/user')
export class UserController {
    constructor(
        private readonly addUserHandler: AddUserHandler,
        private readonly fileFetcher: FileFetcher,
    ) {
    }

    @Post('/')
    public async addUser(
        @Body('userId') userId: string,
        @Body('peerWallet') peerWallet: string,
        @Body('peerIp') peerIp: string,
        @Body('data') data: object,
        @Res() res: Response,
    ) {
        try {
            await this.addUserHandler.handle(new AddUserCommand(userId, peerWallet, peerIp, data));
            return res.status(200).send({message: 'User success added!'});
        } catch (e) {
            return res.status(400).send({message: e.message});
        }
    }

    @Get('/:cid/:id')
    @Header('Content-Disposition', 'attachment;')
    public async getFileById(@Param('cid') cid: string, @Param('id') id: string, @Res() res: Response) {
        try {
            const user = await this.fileFetcher.getById(cid, id);
            return res.send(JSON.parse(user.toString()));
        } catch (e) {
            return res.status(e.status).send({message: e.message});
        }
    }
}
