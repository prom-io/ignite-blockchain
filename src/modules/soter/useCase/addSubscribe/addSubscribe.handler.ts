import {Injectable, Logger} from '@nestjs/common';
import {Command} from './command';
import {ArchiveService} from '../../archive.service';
import {MapService} from '../../map.service';
import {objectToBuffer} from '../../utils';
@Injectable()
export class AddSubscribeHandler {
    private readonly logger = new Logger(AddSubscribeHandler.name);

    constructor(
        private readonly mapService: MapService,
        private readonly archiveService: ArchiveService,
    ) {}

    public async handle(command: Command): Promise<void> {
        const fileName = command.userId + '/subscribes.json';
        let allSubscribes;
        try {
            const allSubscribesData = await this.archiveService.getFile(fileName);
            allSubscribes = JSON.parse(allSubscribesData.toString());
        } catch (e) {
            allSubscribes = {};
        }
        allSubscribes[command.id] = command.data;
        await this.mapService.pushSubscribe(command.id, command.userId, command.peerWallet, command.peerIp);
        await this.archiveService.addFile(objectToBuffer(allSubscribes), fileName, fileName);
        this.logger.debug(`Subscribe with id ${command.id} success added!`);
    }
}
