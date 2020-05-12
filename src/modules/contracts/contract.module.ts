import {Module} from '@nestjs/common';
import {Web3Service} from './web3.service';
import {CidStorageService} from './cidStorage.service';

@Module({
    imports: [],
    controllers: [],
    providers: [Web3Service, CidStorageService],
    exports: [Web3Service, CidStorageService],
})
export class ContractModule {
}
