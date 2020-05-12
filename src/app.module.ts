import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigModule} from './config/config.module';
import {SoterModule} from './modules/soter/soter.module';
import {ConfigService} from './config/config.service';
import {Connection} from 'typeorm';
import {ScheduleModule} from '@nestjs/schedule';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (config: ConfigService) => config.getTypeOrmConfig(),
            inject: [ConfigService],
        }),
        ScheduleModule.forRoot(),
        ConfigModule,
        SoterModule,
    ],
    controllers: [],
    providers: [],
})
export class ApplicationModule {
    constructor(private connection: Connection) {
    }
}
