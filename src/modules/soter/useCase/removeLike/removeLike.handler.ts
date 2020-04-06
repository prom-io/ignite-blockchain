import {Injectable, Logger} from '@nestjs/common';
import {objectToBuffer} from '../../utils';
import {Command} from './command';
import {MapService} from '../../map.service';
import {ArchiveService} from '../../archive.service';

@Injectable()
export class RemoveLikeHandler {
    private readonly logger = new Logger(RemoveLikeHandler.name);

    constructor(
        private readonly mapService: MapService,
        private readonly archiveService: ArchiveService,
    ) {}

    public async handle(command: Command): Promise<void> {
        const fileName = command.commentId + '/unlikes.json';
        let allUnlikes;
        try {
            const allUnLikesBuffer = await this.archiveService.getFile(fileName);
            allUnlikes = JSON.parse(allUnLikesBuffer.toString());
        } catch (e) {
            allUnlikes = {};
        }
        allUnlikes[command.id] = command.data;
        await this.mapService.pushUnLike(command.id, command.commentId, command.peerWallet, command.peerIp);
        await this.archiveService.addFile(objectToBuffer(allUnlikes), fileName, fileName);
        this.logger.debug(`Unlike with id ${command.id} success added!`);
    }
}
