import {Controller} from '@nestjs/common';
import {AddUserHandler} from './useCase/addUser/addUser.handler';
import {Command as AddUserCommand} from './useCase/addUser/command';
import {FileFetcher} from './fetchers/file.fetcher';
import {Ctx, KafkaContext, MessagePattern, Payload} from '@nestjs/microservices';

@Controller()
export class UserController {
    constructor(private readonly addUserHandler: AddUserHandler) {}

    @MessagePattern('ignite.users.add')
    public async createUser(@Payload() message: any, @Ctx() context: KafkaContext) {
        const value = message.value;
        await this.addUserHandler.handle(
            new AddUserCommand(value.userId, value.peerWallet, value.peerIp, value.data),
        );
        return {message: 'User success added WORK!!!!'};
    }
}
