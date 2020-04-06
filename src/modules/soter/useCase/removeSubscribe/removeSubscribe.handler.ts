import {Injectable, Logger} from '@nestjs/common';
import {objectToBuffer} from '../../utils';
import {Command} from './command';
import {MapService} from '../../map.service';
import {ArchiveService} from '../../archive.service';

@Injectable()
export class RemoveSubscribeHandler {
    private readonly logger = new Logger(RemoveSubscribeHandler.name);

    constructor(
        private readonly mapService: MapService,
        private readonly archiveService: ArchiveService,
    ) {}

    public async handle(command: Command): Promise<void> {
        const fileName = command.userId + '/unsubscribes.json';
        let allUnSubscribes;
        try {
            const allUnSubscribesData = await this.archiveService.getFile(fileName);
            allUnSubscribes = JSON.parse(allUnSubscribesData.toString());
        } catch (e) {
            allUnSubscribes = {};
        }
        allUnSubscribes[command.id] = command.data;
        await this.mapService.pushUnSubscribe(command.id, command.userId, command.peerWallet, command.peerIp);
        await this.archiveService.addFile(objectToBuffer(allUnSubscribes), fileName, fileName);
        this.logger.debug(`Un subscribe with id ${command.id} success added!`);
    }
}
