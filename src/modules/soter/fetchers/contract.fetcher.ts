import {Injectable} from '@nestjs/common';
import {CidStorageService} from '../../contracts/cidStorage.service';

@Injectable()
export class ContractFetcher {
    constructor(private readonly cidStorageService: CidStorageService) {
    }

    public async getAllCid(): Promise<any> {
        const allCid = [];
        const cidCount = await this.cidStorageService.getCidCount();
        for (let index = 1; index <= cidCount; index++) {
            const cid = await this.cidStorageService.getCid(index);
            allCid.push(cid);
        }
        return allCid;
    }
}
