import {Injectable} from '@nestjs/common';
import {ArchiveService} from '../../archive.service';
import {Command} from './command';

@Injectable()
export class AddCommentHandler {
    constructor(private readonly archiveService: ArchiveService) {}

    public async handle(command: Command) {
        const jsonMap = await this.archiveService.getMapInArchive();
        if (command.id in jsonMap) {
            throw new Error('Id exists!');
        }
        const jsonData = JSON.stringify(command.data);
        const fileBuffer = Buffer.from(jsonData);
        return await this.archiveService.archiveFile(
            fileBuffer,
            command.id,
            command.id + '.json',
        );
    }
}
