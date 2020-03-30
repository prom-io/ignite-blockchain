import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from './config/config.module';
import {SoterModule} from './modules/soter/soter.module';
import { ConfigService } from './config/config.service';
import {Connection} from 'typeorm';
import {SyncTime} from './model/syncTime.entity';
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
    constructor(private connection: Connection) {}
}
