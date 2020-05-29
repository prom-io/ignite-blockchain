import { Module } from '@nestjs/common';
import {DbSyncEthereumCommand} from './dbSyncEthereum.command';
import {CidBlockService} from '../contracts/cidBlock.service';
import {Web3Service} from '../contracts/web3.service';

@Module({
    imports: [],
    controllers: [],
    providers: [DbSyncEthereumCommand, CidBlockService, Web3Service],
})
export class ConsoleScriptModule {}
