import {Injectable} from '@nestjs/common';
import {TelegramService} from 'nestjs-telegram';
import {ConfigService} from '../../../config/config.service';

@Injectable()
export class TelegramDebugService {
    constructor(
        private readonly telegram: TelegramService,
        private readonly config: ConfigService
    ) {}

    public async sendMessage(text: any): Promise<any> {
        if(this.config.getTelegramDebug() === 'production') {
            return this.telegram.sendMessage({
                chat_id: '-330731984',
                text
            }).toPromise();
        }
        return true;
    }
}
