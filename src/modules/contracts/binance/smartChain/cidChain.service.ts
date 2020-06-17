import {Web3Service} from '../../web3.service';
import Web3 from 'web3';
import {Injectable} from '@nestjs/common';
import {ConfigService} from '../../../../config/config.service';

@Injectable()
export class CidChainService {
    private readonly web3: Web3;

    constructor(
        private readonly web3Service: Web3Service,
        private readonly configService: ConfigService,
    ) {
        this.web3 = web3Service.httpInstanceBinanceSmartChain();
    }

    public contract() {
        return new this.web3.eth.Contract(
            this.configService.getCidChainContractAbi(),
            this.configService.getCidChainContractAddress(),
        );
    }

    public async pushBlock(cid: string): Promise<any> {
        const contract = this.contract();
        const pushBlock = await contract.methods.pushBlock(cid);
        const pushBlockAbi = pushBlock.encodeABI();

        const estimateGas = await contract.methods.pushBlock(cid).estimateGas({
            from: this.configService.get('DEFAULT_ADDRESS')
        });

        const count = await this.web3.eth.getTransactionCount(
            this.configService.get('DEFAULT_ADDRESS')
        );
        const signedTx = await this.web3.eth.accounts.signTransaction({
            nonce: count,
            from: this.configService.get('DEFAULT_ADDRESS'),
            to: this.configService.getCidChainContractAddress(),
            data: pushBlockAbi,
            gas: estimateGas,
        }, this.configService.get('PRIVATE_KEY'));
        return this.web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    }
}
