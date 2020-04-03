import {Injectable} from '@nestjs/common';
import {ArchiveService} from '../../archive.service';
import {Command} from './command';
import {SyncTime} from '../../../../model/syncTime.entity';

@Injectable()
export class AddCommentHandler {
    constructor(private readonly archiveService: ArchiveService) {}

    public async handle(command: Command) {
        const jsonMap = await this.archiveService.getMapInArchive();
        const entitiesMap = await this.archiveService.getEntitiesInArchive();
        if (command.id in jsonMap) {
            throw new Error('Id exists!');
        }
        const posts = entitiesMap.posts ?? [];
        posts.push(command.id);
        entitiesMap.posts = posts;
        const jsonData = JSON.stringify(command.data);
        const fileBuffer = Buffer.from(jsonData);
        return await this.archiveService.addFile(
            fileBuffer,
            entitiesMap,
            command.id,
            command.id + '.json',
        );
    }
}
