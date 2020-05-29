import { Injectable } from '@nestjs/common';
import Web3 from 'web3';
import { ConfigService } from '../../config/config.service';

@Injectable()
export class Web3Service {
    private config: ConfigService;

    constructor(config: ConfigService) {
        this.config = config;
    }

    public httpInstanceMainNet(): Web3 {
        return new Web3(new Web3.providers.HttpProvider(this.config.get('MAIN_NETWORK_HOST')));
    }

    public httpInstancePrivateNet(): Web3 {
        return new Web3(new Web3.providers.HttpProvider(this.config.get('PRIVATE_NETWORK_HOST')))
    }

    public keccak256(value: string) {
        return Web3.utils.keccak256(value);
    }
}
