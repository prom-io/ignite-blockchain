import {ConfigService} from '../../config/config.service';
import {HttpService, Injectable} from '@nestjs/common';
// tslint:disable-next-line:no-var-requires
const TronWeb = require('tronweb');
import {uuidv4, ts} from './utils';
// tslint:disable-next-line:no-var-requires
const FormData = require('form-data');

@Injectable()
export class SoterService {

    constructor(
        private readonly configService: ConfigService,
        private readonly httpService: HttpService,
    ) {
    }

    public tronWebInstance() {
        return new TronWeb(this.configService.getTronConfig());
    }

    public async add(fileBuffer: Buffer, fileName: string) {
        const tronWeb = this.tronWebInstance();
        const requestUser = tronWeb.defaultAddress.base58;
        const signedUser = tronWeb.defaultAddress.base58;
        const requestId = uuidv4();
        const timestamp = ts();
        const rawData = {
            request_user: requestUser,
            signed_user: signedUser,
            request_id: requestId,
            timestamp,
        };
        const rawDataJson = JSON.stringify(rawData);
        const signature = await tronWeb.trx.sign(tronWeb.toHex(rawDataJson));
        const formData = new FormData();
        formData.append('raw_data', rawDataJson);
        formData.append('signature', signature);
        formData.append('file', fileBuffer, fileName);
        return this.httpService.post('/api/v0/add', formData, {
            headers: formData.getHeaders(),
        }).toPromise();
    }

    public async getFileByCid(cid: string) {
        return await this.httpService.get('https://sandbox.btfssoter.io/btfs/' + cid, {responseType: 'arraybuffer'}).toPromise();
    }
}
