import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from './config/config.module';
import {SoterModule} from './modules/soter/soter.module';

@Module({
  imports: [ConfigModule, SoterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
