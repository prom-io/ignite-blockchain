import {Controller} from '@nestjs/common';
import {AddSubscribeHandler} from './useCase/addSubscribe/addSubscribe.handler';
import {Command as AddSubscribeCommand} from './useCase/addSubscribe/command';
import {Ctx, KafkaContext, MessagePattern, Payload} from '@nestjs/microservices';

@Controller()
export class SubscribeController {
    constructor(private readonly addSubscribeHandler: AddSubscribeHandler) {
    }

    @MessagePattern('ignite.subscribes.add')
    public async createSubscribe(@Payload() message: any, @Ctx() context: KafkaContext) {
        const value = message.value;
        await this.addSubscribeHandler.handle(
            new AddSubscribeCommand(
                value.id,
                value.userId,
                value.peerWallet,
                value.peerIp,
                value.data,
            ),
        );
        return {message: 'Subscribe success added! WORK!!!!'};
    }
}
