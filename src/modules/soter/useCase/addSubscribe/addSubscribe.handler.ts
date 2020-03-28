import {Injectable} from '@nestjs/common';
import {Command} from './command';
import {ArchiveService} from '../../archive.service';

@Injectable()
export class AddSubscribeHandler {
    constructor(private readonly archiveService: ArchiveService) {
    }

    public async handle(command: Command) {
        const entitiesMap = await this.archiveService.getEntitiesInArchive();
        let allSubscribes;
        try {
            const allSubscribesData = await this.archiveService.getFileInZip(command.userId + '/subscribes.json');
            allSubscribes = JSON.parse(allSubscribesData.toString());
        } catch (e) {
            allSubscribes = {};
        }
        const subscribes = entitiesMap.subscribes ?? [];
        subscribes.push({userId: command.userId, id: command.id});
        entitiesMap.subscribes = subscribes;
        const fileName = command.userId + '/subscribes.json';
        allSubscribes[command.id] = command.data;
        return await this.archiveService.fileToArchive(
            Buffer.from(JSON.stringify(allSubscribes)),
            entitiesMap,
            fileName,
            fileName,
            [fileName],
        );
    }
}
