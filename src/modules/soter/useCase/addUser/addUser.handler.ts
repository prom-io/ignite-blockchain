import {Injectable, Logger} from '@nestjs/common';
import {MapService} from '../../map.service';
import {ArchiveService} from '../../archive.service';
import {Command} from './command';
import { objectToBuffer, fileNameGenerate } from '../../utils';

@Injectable()
export class AddUserHandler {
    private readonly logger = new Logger(AddUserHandler.name);

    constructor(
        private readonly mapService: MapService,
        private readonly archiveService: ArchiveService,
    ) {}

    public async handle(command: Command): Promise<void> {
        try {
            const fileBuffer = objectToBuffer(command.data);
            const fileName = fileNameGenerate(command.userId, 'json');
            await this.mapService.pushUser(command.userId, command.peerWallet, command.peerIp);
            await this.archiveService.addFile(fileBuffer, command.userId, fileName);
            this.logger.debug(`User with id ${command.userId} saved!`);
        } catch (e) {
            this.logger.error(e.message);
            throw e;
        }
    }
}
