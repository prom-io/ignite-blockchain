import {Controller} from '@nestjs/common';
import {AddPostHandler} from './useCase/addPost/addPost.handler';
import {Command as AddPostCommand} from './useCase/addPost/command';
import {Ctx, KafkaContext, MessagePattern, Payload} from '@nestjs/microservices';

@Controller()
export class PostController {
    constructor(private readonly addPostHandler: AddPostHandler) {
    }

    @MessagePattern('ignite.posts.add')
    public async createPost(@Payload() message: any, @Ctx() context: KafkaContext) {
        const value = message.value;
        await this.addPostHandler.handle(
            new AddPostCommand(value.id, value.peerWallet, value.peerIp, value.data),
        );
        return {message: 'Post success added WORK!!!!'};
    }
}
