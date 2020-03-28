import {Injectable} from '@nestjs/common';
import {SoterService} from '../soter.service';
import {ArchiveService} from '../archive.service';
// tslint:disable-next-line:no-var-requires
const FileType = require('file-type');

@Injectable()
export class BtfsFetcher {
    constructor(
        private readonly soterService: SoterService,
        private readonly archiveService: ArchiveService,
    ) {
    }

    public async getEntities(cid: string) {
        const file = await this.soterService.getFileByCid(cid);
        const fileType = await FileType.fromBuffer(file.data);
        if (fileType.ext !== 'zip') {
            throw new Error('This not valid CID!');
        }
        const entities = await this.archiveService.getFileInBuffer(
            this.archiveService.getEntitiesFileName(),
            file.data,
        );
        return JSON.parse(entities.toString());
    }
}
