import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ConfigModule} from './config/config.module';
import {SoterModule} from './modules/soter/soter.module';
import { ConfigService } from './config/config.service';
import {Connection} from 'typeorm';
import {ScheduleModule} from '@nestjs/schedule';
import {ConsoleModule} from 'nestjs-console';
import {DbSyncEthereumCommand} from './modules/console/dbSyncEthereum.command';
import {CidBlockService} from './modules/contracts/cidBlock.service';
import {Web3Service} from './modules/contracts/web3.service';
import {ConsoleScriptModule} from './modules/console/consoleScript.module';

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
      ConsoleModule,
      ConsoleScriptModule,
  ],
  controllers: [],
  providers: [],
})
export class ApplicationModule {
    constructor(private connection: Connection) {}
}
