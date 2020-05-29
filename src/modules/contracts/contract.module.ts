import {Module} from '@nestjs/common';
import {Web3Service} from './web3.service';
import {CidStorageService} from './cidStorage.service';
import {CidBlockService} from './cidBlock.service';
import {RootChainService} from './rootChain.service';

@Module({
    imports: [],
    controllers: [],
    providers: [Web3Service, CidStorageService, CidBlockService, RootChainService],
    exports: [Web3Service, CidStorageService, CidBlockService, RootChainService],
})
export class ContractModule {}
