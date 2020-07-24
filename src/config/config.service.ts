import * as dotenv from 'dotenv';
import * as fs from 'fs';
import {TypeOrmModuleOptions} from '@nestjs/typeorm';
import {SyncTime} from '../model/syncTime.entity';
import {AbiItem} from 'web3-utils';

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

    public getCidStorageContractAbi(): AbiItem[] {
        return [
            {
                'constant': true,
                'inputs': [],
                'name': 'cidCount',
                'outputs': [
                    {
                        'name': '',
                        'type': 'uint256'
                    }
                ],
                'payable': false,
                'stateMutability': 'view',
                'type': 'function'
            },
            {
                'constant': true,
                'inputs': [
                    {
                        'name': '',
                        'type': 'uint256'
                    }
                ],
                'name': 'allCid',
                'outputs': [
                    {
                        'name': '',
                        'type': 'string'
                    }
                ],
                'payable': false,
                'stateMutability': 'view',
                'type': 'function'
            },
            {
                'anonymous': false,
                'inputs': [
                    {
                        'indexed': false,
                        'name': 'cidIndex',
                        'type': 'uint256'
                    },
                    {
                        'indexed': false,
                        'name': 'cid',
                        'type': 'string'
                    }
                ],
                'name': 'CidSaved',
                'type': 'event'
            },
            {
                'constant': false,
                'inputs': [
                    {
                        'name': 'cid',
                        'type': 'string'
                    }
                ],
                'name': 'setCid',
                'outputs': [],
                'payable': false,
                'stateMutability': 'nonpayable',
                'type': 'function'
            }
        ];
    }

    public getCidStorageContractAddress(): string {
        return this.get('CID_STORAGE_CONTRACT_ADDRESS');
    }

    public getDefaultGas(): object {
        return {from: this.get('DEFAULT_ADDRESS'), gas: 1e6, gasPrice: 8 * 1e9};
    }
}
