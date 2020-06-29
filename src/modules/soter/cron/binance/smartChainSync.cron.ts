import {Cron} from '@nestjs/schedule';
import {Injectable, Logger} from '@nestjs/common';
import {CidBlockService} from '../../../contracts/cidBlock.service';
import {BinanceRootChainService} from '../../../contracts/binance/smartChain/binanceRootChain.service';
import {Web3Service} from '../../../contracts/web3.service';

@Injectable()
export class SmartChainSyncCron {
    private readonly logger = new Logger(SmartChainSyncCron.name);

    constructor(
        private readonly web3Service: Web3Service,
        private readonly cidBlockService: CidBlockService,
        private readonly rootChainService: BinanceRootChainService,
    ) {}

    @Cron('0 1 * * *', {
        name: 'sync_binance_smart_chain',
    })
    async handleCronSync() {
        try {
            this.logger.debug('=========== Sync with binance smart chain started! ===========');
            let lastSyncBlock = await this.rootChainService.lastSyncBlock();
            lastSyncBlock = Number(lastSyncBlock);
            let lastCommittedBlock = await this.cidBlockService.lastCommittedBlock();
            lastCommittedBlock = Number(lastCommittedBlock);

            if(lastCommittedBlock <= 1) {
                throw new Error('Sync block less! Please Wait!');
            }

            if(lastSyncBlock === lastCommittedBlock) {
                throw new Error('Sync no need!')
            }
            let verificationHash = '';
            for (lastSyncBlock; lastSyncBlock <= lastCommittedBlock; lastSyncBlock++) {
                const block = await this.cidBlockService.getPlasmaBlock(lastSyncBlock);
                verificationHash += block.btfsCid;
            }
            verificationHash = this.web3Service.keccak256(verificationHash);
            await this.rootChainService.submitVerificationBlock(
                verificationHash,
                Number(lastCommittedBlock)
            );
            this.logger.debug('=========== Sync with binance smart chain completed! ===========');
        } catch (e) {
            this.logger.error(e.message);
        }
    }
}
