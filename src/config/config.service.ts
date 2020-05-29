import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import {SyncTime} from '../model/syncTime.entity';
import {AbiItem} from 'web3-utils';
import { cidStorageAbi } from '../modules/contracts/abi/cidStorage.abi';
import { cidBlockAbi } from '../modules/contracts/abi/cidBlock.abi';
import { rootChainAbi } from '../modules/contracts/abi/rootChain.abi';
export class ConfigService {
    private readonly envConfig: { [key: string]: string };

    constructor(filePath: any) {
        this.envConfig = dotenv.parse(fs.readFileSync(filePath));
    }

    get(key: string): string {
        return this.envConfig[key];
    }

    getTronConfig(): object {
        return {
            fullHost: this.get('TRON_FULL_HOST'),
            privateKey: this.get('TRON_PRIVATE_KEY'),
        };
    }

    getIgniteNodeAddress(): string {
        return this.get('IGNITE_NODE_API');
    }

    getTypeOrmConfig(): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            host: this.get('POSTGRES_HOST'),
            port: Number(this.get('POSTGRES_PORT')),
            username: this.get('POSTGRES_USER'),
            password: this.get('POSTGRES_PASSWORD'),
            database: this.get('POSTGRES_DATABASE'),
            entities: [SyncTime],
            synchronize: true,
            ssl: false,
        };
    }

    public getMainNetAddress(): string {
        return this.get('MAIN_NET_DEFAULT_ADDRESS');
    }

    public getPrivateNetAddress(): string {
        return this.get('PRIVATE_NET_DEFAULT_ADDRESS');
    }

    public getCidStorageContractAbi(): AbiItem[] {
        return cidStorageAbi;
    }

    public getCidStorageContractAddress(): string {
        return this.get('CID_STORAGE_CONTRACT_ADDRESS');
    }

    public getCidBlockContractAbi(): AbiItem[] {
        return cidBlockAbi;
    }

    public getCidBlockContractAddress(): string {
        return this.get('CID_BLOCK_CONTRACT_ADDRESS');
    }

    public getRootChainContractAbi(): AbiItem[] {
        return rootChainAbi;
    }

    public getRootChainContractAddress(): string {
        return this.get('ROOT_CHAIN_CONTRACT_ADDRESS');
    }
}
