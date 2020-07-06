import {HttpService, Injectable} from '@nestjs/common';
import {ConfigService} from '../../config/config.service';
// tslint:disable-next-line:no-var-requires
const FormData = require('form-data');

@Injectable()
export class ArweaveService {
    constructor(
        private readonly configService: ConfigService,
        public readonly httpService: HttpService,
    ) {}

    public async add(fileBuffer: Buffer, fileName: string) {
        const formData = new FormData();
        formData.append('file', fileBuffer, fileName);
        return this.httpService.post(this.configService.get('ARWEAVE_HOST') + '/api/files', formData, {
            headers: formData.getHeaders(),
        }).toPromise();
    }
}
