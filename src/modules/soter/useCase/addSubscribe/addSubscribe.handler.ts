import {Injectable} from '@nestjs/common';
import {Command} from './command';
import {ArchiveService} from '../../archive.service';

@Injectable()
export class AddSubscribeHandler {
    constructor(private readonly archiveService: ArchiveService) {
    }

    public async handle(command: Command) {
        let allSubscribes;
        try {
            const allSubscribesData = await this.archiveService.getFileByName(command.userId + '/subscribes.json');
            allSubscribes = JSON.parse(allSubscribesData.toString());
        } catch (e) {
            allSubscribes = {};
        }
        const fileName = command.userId + '/subscribes.json';
        allSubscribes[command.id] = command.data;
        return await this.archiveService.archiveFile(
            Buffer.from(JSON.stringify(allSubscribes)),
            fileName,
            fileName,
            [fileName],
        );
    }
}
