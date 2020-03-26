import {Body, Controller, Post, Res} from '@nestjs/common';
import {AddSubscribeHandler} from './useCase/addSubscribe/addSubscribe.handler';
import {Command as AddSubscribeCommand} from './useCase/addSubscribe/command';
import {Response} from 'express';

@Controller('/v1/subscribe')
export class SubscribeController {
    constructor(private readonly addSubscribeHandler: AddSubscribeHandler) {
    }

    @Post()
    public async addSubscribe(
        @Body('id') id: string,
        @Body('userId') userId: string,
        @Body('data') data: object,
        @Res() res: Response,
    ) {
        await this.addSubscribeHandler.handle(new AddSubscribeCommand(id, userId, data));
        return res.status(200).send({message: 'Subscribe success added!'});
    }
}
