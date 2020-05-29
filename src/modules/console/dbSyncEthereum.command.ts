import { Console, Command, createSpinner } from 'nestjs-console';
import {CidBlockService} from '../contracts/cidBlock.service';
import {SyncTime} from '../../model/syncTime.entity';

@Console({
    name: 'ethereum',
    description: 'With ethereum work commands.'
})
export class DbSyncEthereumCommand {
    constructor(private readonly cidBlockService: CidBlockService) {}

    @Command({
        command: 'sync:db',
        description: 'Local db sync with ethereum network.'
    })
    public async syncWithEthereum() {
        const spin = createSpinner();
        try {
            spin.start('Sync process started!');
            const syncTimes = await SyncTime.find();
            for (const syncTime of syncTimes) {
                if(syncTime.btfsCid) {
                    await this.cidBlockService.submitBlock(syncTime.btfsCid);
                }
            }
            spin.succeed('Sync process completed!');
        } catch (e) {
            spin.fail('Sync failed. Error: ' + e.message);
        }
    }
}
