import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

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
}
