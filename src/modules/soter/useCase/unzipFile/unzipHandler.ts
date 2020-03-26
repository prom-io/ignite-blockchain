import {Injectable} from '@nestjs/common';
// @ts-ignore
import AdmZip = require('adm-zip');

@Injectable()
export class UnzipHandler {
    public async handle() {
        const zip = new AdmZip('./files/test.zip');
        const zipEntries = zip.getEntries();
        let data;
        zipEntries.forEach((zipEntry) => {
            if (zipEntry.entryName === '1.json') {
                data = zipEntry.getData();
            }
        });
        if (data !== undefined) {
            return data;
        }
        throw new Error('File not found!');
    }
}
