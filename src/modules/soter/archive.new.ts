import {Injectable} from '@nestjs/common';
import * as fs from 'fs';
import Archiver = require('archiver');
// @ts-ignore
import AdmZip = require('adm-zip');
import {SyncTime} from '../../model/syncTime.entity';
import {zip} from 'rxjs';
import {map} from 'rxjs/operators';

export class ArchiveNew {
    private readonly basePath: string = './files';
    private readonly mapName: string = 'map.json';
    private zipPath: string = '';

    public async fileToArchive(fileBuffer: Buffer, mapId: string, filePath: string, noRewriteFiles = []): Promise<void> {
        noRewriteFiles.push(this.mapName);
        const zipPath = await this.zipPathGenerate();
        const zipCurrentFiles = await this.getZipFiles();
        const jsonMap = await this.getMapInArchive();

        const output = fs.createWriteStream(zipPath);
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
        zipCurrentFiles.forEach((zipEntry) => {
             if (!noRewriteFiles.includes(zipEntry.entryName)) {
                 archive.append(zipEntry.getData(), {name: zipEntry.entryName});
             }
        });
        jsonMap[mapId] = filePath;
        console.log(jsonMap);
        const bufferJson = Buffer.from(JSON.stringify(jsonMap));
        archive.append(bufferJson, { name: 'map.json' });
        archive.append(fileBuffer, { name: filePath });
        await archive.finalize();
    }

    public async zipPathGenerate(): Promise<string> {
        let lastHash = await SyncTime.findLatestItem();
        if (!lastHash) {
            lastHash = new SyncTime();
            // tslint:disable-next-line:new-parens
            lastHash.hash = ((+new Date) + Math.random() * 100).toString(32);
            lastHash.createdAt = new Date();
            await lastHash.save();
        }
        lastHash = await SyncTime.findLatestItem();
        const path = this.getPath(lastHash.hash, 'zip');
        this.zipPath = path;
        return path;
    }

    public getPath(fileName: string, fileExt: string): string {
        return this.basePath + '/' + fileName + '.' + fileExt;
    }

    public async getZipFiles() {
        const path = await this.zipPathGenerate();
        let zipEntries = [];
        if (fs.existsSync(path)) {
            const admZip = new AdmZip(path);
            zipEntries = admZip.getEntries();
        }
        return zipEntries;
    }

    public async getZipFile(fileName: string) {
        const path = await this.zipPathGenerate();
        if (!fs.existsSync(path)) {
            throw new Error('Zip file not created!');
        }
        const admZip = new AdmZip(path);
        const zipEntry = admZip.getEntry(fileName);
        if (zipEntry) {
            return zipEntry.getData();
        }
        throw new Error('File not found!');
    }

    public async getMapInArchive() {
        try {
            const buffer = await this.getZipFile(this.mapName);
            return JSON.parse(buffer.toString());
        } catch (e) {
            return {};
        }
    }
}
