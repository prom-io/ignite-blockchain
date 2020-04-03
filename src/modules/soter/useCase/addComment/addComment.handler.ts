import {Injectable} from '@nestjs/common';
import {ArchiveService} from '../../archive.service';
import {Command} from './command';
import {SyncTime} from '../../../../model/syncTime.entity';
import {MapService} from '../../map.service';

@Injectable()
export class AddCommentHandler {
    constructor(
        private readonly mapService: MapService,
        private readonly archiveService: ArchiveService,
    ) {}

    public async handle(command: Command) {
        // const jsonMap = await this.archiveService.getMapInArchive();
        // const entitiesMap = await this.archiveService.getEntitiesInArchive();
        // if (command.id in jsonMap) {
        //     throw new Error('Id exists!');
        // }
        const lastHash = await this.mapService.getLastHash();
        // @ts-ignore
        const posts = lastHash.entityMap.posts ?? [];
        posts.push(command.id);
        // @ts-ignore
        lastHash.entityMap.posts = Array.from(new Set(posts));
        const jsonData = JSON.stringify(command.data);
        const fileBuffer = Buffer.from(jsonData);
        return await this.archiveService.addFile(
            fileBuffer,
            lastHash.entityMap,
            command.id,
            command.id + '.json',
        );
    }
}
