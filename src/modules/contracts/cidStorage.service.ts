import {Web3Service} from './web3.service';
import Web3 from 'web3';
import {Injectable} from '@nestjs/common';
import {ConfigService} from '../../config/config.service';

@Injectable()
export class CidStorageService {
    private readonly web3: Web3;

    constructor(
        private readonly web3Service: Web3Service,
        private readonly configService: ConfigService,
    ) {
        this.web3 = web3Service.httpInstance();
    }

    public contract() {
        return new this.web3.eth.Contract(
            this.configService.getCidStorageContractAbi(),
            this.configService.getCidStorageContractAddress(),
        );
    }

    public async setCid(cid: string): Promise<any> {
        const contract = this.contract();
        return contract.methods.setCid(cid).send(this.configService.getDefaultGas());
    }

    public async getCidCount(): Promise<any> {
        const contract = this.contract();
        return contract.methods.cidCount().call();
    }

    public async getCid(index: number): Promise<any> {
        const contract = this.contract();
        return contract.methods.allCid(index).call();
    }
}
