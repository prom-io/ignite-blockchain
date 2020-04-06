import {Injectable, Logger} from '@nestjs/common';
import {Command} from './command';
import {ArchiveService} from '../../archive.service';
import {MapService} from '../../map.service';
import {objectToBuffer} from '../../utils';
@Injectable()
export class AddLikeHandler {
    private readonly logger = new Logger(AddLikeHandler.name);

    constructor(
        private readonly mapService: MapService,
        private readonly archiveService: ArchiveService,
    ) {}

    public async handle(command: Command) {
        const fileName = command.commentId + '/likes.json';
        let allLikes;
        try {
            const allLikesBuffer = await this.archiveService.getFile(fileName);
            allLikes = JSON.parse(allLikesBuffer.toString());
        } catch (e) {
            allLikes = {};
        }
        allLikes[command.id] = command.data;
        await this.mapService.pushLike(command.id, command.commentId, command.peerWallet, command.peerIp);
        await this.archiveService.addFile(objectToBuffer(allLikes), fileName, fileName);
        this.logger.debug(`Like with id ${command.id} success added!`);
    }
}
