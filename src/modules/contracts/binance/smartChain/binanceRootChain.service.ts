import {Web3Service} from '../../web3.service';
import Web3 from 'web3';
import {Injectable} from '@nestjs/common';
import {ConfigService} from '../../../../config/config.service';

@Injectable()
export class BinanceRootChainService {
    private readonly web3: Web3;

    constructor(
        private readonly web3Service: Web3Service,
        private readonly configService: ConfigService,
    ) {
        this.web3 = web3Service.httpInstanceBinanceSmartChain();
    }

    public contract() {
        return new this.web3.eth.Contract(
            this.configService.getRootChainContractAbi(),
            this.configService.getBinanceRootChainContractAddress(),
        );
    }

    public async submitVerificationBlock(verificationHash: string, lastSyncBlock: number) {
        const contract = this.contract();
        const verificationBlock = await contract.methods.submitVerificationBlock(verificationHash, lastSyncBlock);
        const verificationBlockAbi = verificationBlock.encodeABI();
        const count = await this.web3.eth.getTransactionCount(this.configService.get('DEFAULT_ADDRESS'));
        const signedTx = await this.web3.eth.accounts.signTransaction({
            nonce: count,
            from: this.configService.get('DEFAULT_ADDRESS'),
            to: this.configService.getBinanceRootChainContractAddress(),
            data: verificationBlockAbi,
            gas: 200000,
        }, this.configService.get('PRIVATE_KEY'));
        return this.web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    }

    public async lastSyncBlock() {
        const contract = this.contract();
        return contract.methods.lastSyncBlock().call();
    }
}
