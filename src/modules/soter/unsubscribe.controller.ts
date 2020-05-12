import {Controller} from '@nestjs/common';
import {RemoveSubscribeHandler} from './useCase/removeSubscribe/removeSubscribe.handler';
import {Command as RemoveSubscribeCommand} from './useCase/removeSubscribe/command';
import {Ctx, KafkaContext, MessagePattern, Payload} from '@nestjs/microservices';

@Controller()
export class UnsubscribeController {
    constructor(private readonly addUnsubscribeHandler: RemoveSubscribeHandler) {
    }

    @MessagePattern('ignite.unsubscribes.add')
    public async createUnsubscribe(@Payload() message: any, @Ctx() context: KafkaContext) {
        const value = message.value;
        await this.addUnsubscribeHandler.handle(
            new RemoveSubscribeCommand(
                value.id,
                value.userId,
                value.peerWallet,
                value.peerIp,
                value.data,
            ),
        );
        return {message: 'Unsubscribe success added WORK!!!!!'}
    }
}
