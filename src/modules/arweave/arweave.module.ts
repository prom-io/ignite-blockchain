import {HttpModule, Module} from '@nestjs/common';
import {ConfigService} from '../../config/config.service';
import {ConfigModule} from '../../config/config.module';
import {ArweaveService} from './arweave.service';
// tslint:disable-next-line:no-var-requires
const https = require('https');

@Module({
    imports: [
        HttpModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                baseURL: configService.get('ARWEAVE_HOST'),
                httpsAgent: new https.Agent({
                    rejectUnauthorized: false,
                }),
                headers: {
                    'Content-Type': 'multipart/form-data; charset=UTF-8',
                },
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [],
    providers: [ArweaveService],
    exports: [ArweaveService],
})
export class ArweaveModule {}
