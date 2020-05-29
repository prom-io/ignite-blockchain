import {HttpService, Injectable} from '@nestjs/common';
import {ConfigService} from '../../../config/config.service';
import { AxiosResponse } from 'axios';
@Injectable()
export class IgniteNodeService {
    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {}

    public async sendCid(cid: string): Promise<AxiosResponse> {
        return this.httpService.post(this.configService.getIgniteNodeAddress() + '/api/v3/btfs', {
            btfsCid: cid,
            peerWallet: this.configService.get('PEER_WALLET'),
            peerIp: this.configService.get('PEER_IP'),
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).toPromise();
    }
}
