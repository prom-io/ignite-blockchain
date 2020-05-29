import {Injectable} from '@nestjs/common';
import {TelegramService} from 'nestjs-telegram';

@Injectable()
export class TelegramDebugService {
    constructor(
        private readonly telegram: TelegramService,
    ) {}

    public async sendMessage(text: any): Promise<any> {
        return this.telegram.sendMessage({
            chat_id: '-330731984',
            text
        }).toPromise();
    }
}
