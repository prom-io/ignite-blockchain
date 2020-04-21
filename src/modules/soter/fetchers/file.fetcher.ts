import {ArchiveService} from '../archive.service';
import {Injectable} from '@nestjs/common';
import {SoterService} from '../soter.service';

@Injectable()
export class FileFetcher {
    constructor(
        private readonly archiveService: ArchiveService,
        private readonly soterService: SoterService,
    ) {}

    public async getById(cid: string, id: string) {
        const file = await this.soterService.getFileByCid(cid);
        const jsonMap = await this.archiveService.getMapInBuffer(file.data);

        if (!jsonMap[id]) {
            throw new Error('File not found!');
        }

        return this.archiveService.getFileInBuffer(jsonMap[id], file.data);
    }
}
