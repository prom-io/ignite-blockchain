import {Injectable, Logger} from '@nestjs/common';
import {Command} from './command';
import {ArchiveService} from '../../archive.service';
import {MapService} from '../../map.service';

@Injectable()
export class AddSubscribeHandler {
    private readonly logger = new Logger(AddSubscribeHandler.name);

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
        // const subscribes = lastHash.entityMap.subscribes ?? [];
        if (!lastHash.entityMap.subscribes) {
            // @ts-ignore
            lastHash.entityMap.subscribes = [];
        }
        // @ts-ignore
        lastHash.entityMap.subscribes.push({userId: command.userId, id: command.id});
        // @ts-ignore
        // lastHash.entityMap.subscribes = subscribes;
        await lastHash.save();
        this.logger.debug(lastHash.entityMap);
        allSubscribes[command.id] = command.data;
        return await this.archiveService.addFile(
            Buffer.from(JSON.stringify(allSubscribes)),
            lastHash.entityMap,
            fileName,
            fileName,
        );
    }
}
