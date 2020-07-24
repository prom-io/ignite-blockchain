import {Controller} from '@nestjs/common';
import {AddLikeHandler} from './useCase/addLike/addLike.handler';
import {Command as AddLikeCommand} from './useCase/addLike/command';
import {Ctx, KafkaContext, MessagePattern, Payload} from '@nestjs/microservices';

@Controller()
export class LikeController {
    constructor(private readonly addLikeHandler: AddLikeHandler) {
    }

    @MessagePattern('ignite.likes.add')
    public async createLike(@Payload() message: any, @Ctx() context: KafkaContext) {
        const value = message.value;
        await this.addLikeHandler.handle(
            new AddLikeCommand(value.id, value.commentId, value.peerWallet, value.peerIp, value.data),
        );
        return {message: 'Likes success added WORK!!!!'};
    }
}
