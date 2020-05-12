import {Injectable} from '@nestjs/common';
import * as fs from 'fs';
import Archiver = require('archiver');

@Injectable()
export class ArchiveHandler {
    public async handle() {
        const output = fs.createWriteStream('./files/test.zip');
        const archive = Archiver.create('zip');

        output.on('close', () => {
            console.log(archive.pointer() + ' total bytes');
            console.log('archiver has been finalized and the output file descriptor has closed.');
        });
        output.on('end', () => {
            console.log('Data has been drained');
        });

        archive.on('warning', (err) => {
            if (err.code === 'ENOENT') {
                // log warning
            } else {
                // throw error
                throw err;
            }
        });

        archive.on('error', (err) => {
            throw err;
        });

        archive.pipe(output);
        archive.file('/home/aibek/images/500x500.jpeg', {name: '500X500.jpeg'});
        archive.file('/home/aibek/images/1.jpg', {name: '1.jpg'});
        await archive.finalize();
    }
}
