import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import {SyncTime} from '../model/syncTime.entity';

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
}
