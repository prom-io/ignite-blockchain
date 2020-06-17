import {Module} from '@nestjs/common';
import {Web3Service} from './web3.service';
import {CidStorageService} from './cidStorage.service';
import {CidBlockService} from './cidBlock.service';
import {RootChainService} from './rootChain.service';
import {BinanceRootChainService} from './binance/smartChain/binanceRootChain.service';
import {CidChainService} from './binance/smartChain/cidChain.service';

@Module({
    imports: [],
    controllers: [],
    providers: [
        Web3Service,
        CidStorageService,
        CidBlockService,
        RootChainService,
        BinanceRootChainService,
        CidChainService,
    ],
    exports: [
        Web3Service,
        CidStorageService,
        CidBlockService,
        RootChainService,
        BinanceRootChainService,
        CidChainService,
    ],
})
export class ContractModule {}
