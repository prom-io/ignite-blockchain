import {Injectable} from '@nestjs/common';
import {Command} from './command';
import {ArchiveService} from '../../archive.service';
import {MapService} from '../../map.service';

@Injectable()
export class AddSubscribeHandler {
    constructor(
        private readonly mapService: MapService,
        private readonly archiveService: ArchiveService,
    ) {}

    public async handle(command: Command) {
        // const entitiesMap = await this.archiveService.getEntitiesInArchive();
        const lastHash = await this.mapService.getLastHash();
        const fileName = command.userId + '/subscribes.json';
        let allSubscribes;
        try {
            const allSubscribesData = await this.archiveService.getFile(fileName);
            allSubscribes = JSON.parse(allSubscribesData.toString());
        } catch (e) {
            allSubscribes = {};
        }
        // @ts-ignore
        const subscribes = lastHash.entityMap.subscribes ?? [];
        subscribes.push({userId: command.userId, id: command.id});
        // @ts-ignore
        lastHash.entityMap.subscribes = subscribes;
        await lastHash.save();
        allSubscribes[command.id] = command.data;
        return await this.archiveService.addFile(
            Buffer.from(JSON.stringify(allSubscribes)),
            lastHash.entityMap,
            fileName,
            fileName,
        );
    }
}
