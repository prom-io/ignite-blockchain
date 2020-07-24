import {Controller} from '@nestjs/common';
import {RemoveLikeHandler} from './useCase/removeLike/removeLike.handler';
import {Command as RemoveLikeCommand} from './useCase/removeLike/command';
import {Ctx, KafkaContext, MessagePattern, Payload} from '@nestjs/microservices';

@Controller()
export class UnlikeController {
    constructor(private readonly removeLikeHandler: RemoveLikeHandler) {
    }

    @MessagePattern('ignite.unlikes.add')
    public async createUnlike(@Payload() message: any, @Ctx() context: KafkaContext) {
        const value = message.value;
        await this.removeLikeHandler.handle(
            new RemoveLikeCommand(
                value.id,
                value.commentId,
                value.peerWallet,
                value.peerIp,
                value.data,
            ),
        );
        return {message: 'Unlike success added WORK!!!!!'}
    }
}
