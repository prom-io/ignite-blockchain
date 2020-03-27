import {ArchiveService} from '../archive.service';
import {Injectable} from '@nestjs/common';

@Injectable()
export class FileFetcher {
    constructor(private readonly archiveService: ArchiveService) {}

    public async getById(id: string) {
        const jsonMap = await this.archiveService.getMapInArchive();
        if (!jsonMap[id]) {
            throw new Error('File not found!');
        }
        return await this.archiveService.getFileInZip(jsonMap[id]);
    }

    public async test() {
        return await this.archiveService.getFileInZip('test/1.jpeg');
    }
}
