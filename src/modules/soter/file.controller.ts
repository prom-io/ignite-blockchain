import {Controller} from '@nestjs/common';
import {UploadHandler} from './useCase/uploadFile/uploadHandler';
import {Command as UploadCommand} from './useCase/uploadFile/command';
import {Ctx, KafkaContext, MessagePattern, Payload} from '@nestjs/microservices';

@Controller()
export class FileController {
    constructor(private readonly uploadHandler: UploadHandler) {}

    @MessagePattern('ignite.files.add')
    public async uploadFile(@Payload() message: any, @Ctx() context: KafkaContext) {
        const value = message.value;
        await this.uploadHandler.handle(
            new UploadCommand(value.id, value.peerWallet, value.peerIp, value.file),
        );
        return {message: 'File success uploaded! WORK!!!!!'}
    }
}
