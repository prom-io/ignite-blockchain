import {Injectable} from '@nestjs/common';
import * as fs from 'fs';
import Archiver = require('archiver');
// @ts-ignore
import AdmZip = require('adm-zip');

@Injectable()
export class ArchiveService {
    public async archiveFile(fileBuffer: Buffer, fileId: string, fileName: string, excludeFiles = []) {
        let zipEntries;
        let jsonMap = {};
        if (fs.existsSync('./files/test1.zip')) {
            jsonMap = await this.getMapInArchive();
            const zip = new AdmZip('./files/test1.zip');
            zipEntries = zip.getEntries();
        }
        const output = fs.createWriteStream('./files/test1.zip');
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

        if (zipEntries) {
            zipEntries.forEach((zipEntry) => {
                if (zipEntry.entryName != 'map.json' && !excludeFiles.includes(zipEntry.entryName)) {
                    archive.append(zipEntry.getData(), {name: zipEntry.entryName});
                }
            });
        }
        jsonMap[fileId] = fileName;
        console.log(jsonMap);
        const bufferJson = Buffer.from(JSON.stringify(jsonMap));
        archive.append(bufferJson, { name: 'map.json' });
        archive.append(fileBuffer, { name: fileName });
        await archive.finalize();
    }

    public async getFileByName(fileName: string): Promise<any> {
        if (!fs.existsSync('./files/test1.zip')) {
            throw new Error('Zip file not created!');
        }
        const zip = new AdmZip('./files/test1.zip');
        const zipEntry = zip.getEntry(fileName);
        if (zipEntry) {
            return zipEntry.getData();
        }
        throw new Error('File not found!');
    }

    public async getMapInArchive(): Promise<any> {
        try {
            const fileName = 'map';
            const fileExt = '.json';
            const buffer = await this.getFileByName(fileName + fileExt);
            return JSON.parse(buffer.toString());
        } catch (e) {
            return {};
        }
    }
}
