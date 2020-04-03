import {Injectable, Logger} from '@nestjs/common';
import * as fs from 'fs';
import * as fse from 'fs-extra';
// const fse = require('fs-extra');
import Archiver = require('archiver');
// @ts-ignore
import AdmZip = require('adm-zip');
import {SyncTime} from '../../model/syncTime.entity';
import {MapService} from './map.service';

@Injectable()
export class ArchiveService {
    private readonly logger = new Logger(ArchiveService.name);
    private readonly basePath: string = './files';
    private readonly mapName: string = 'map.json';
    private readonly entitiesName: string = 'entities.json';
    private zipPath: string = '';

    constructor(private readonly mapService: MapService) {
    }

    public async addFile(fileBuffer: Buffer, entitiesMap: object, mapId: string, filePath: string, noRewriteFiles = []): Promise<void> {
        try {
            const path = await this.generatePath(filePath);
            const lastHash = await this.mapService.getLastHash();
            lastHash.fileMap[mapId] = filePath;
            await lastHash.save();
            await fse.outputFile(path, fileBuffer);
            await this.mapService.updateMaps(lastHash.fileMap, entitiesMap);
            this.logger.debug('File success saved!');
        } catch (e) {
            this.logger.error(e.message);
        }

        // const lastHash = await this.getLastHash();
        // const dirPath = this.basePath + '/' + lastHash;
        // if (!fs.existsSync(dirPath)) {
        //     fs.mkdirSync(dirPath);
        // }

        // fs.writeFile(path, fileBuffer,(err) => {
        //     if (err) { throw err; }
        //     this.logger.debug('Results Received');
        // });
        // const path = await this.zipPathGenerate();
        // let admZip;
        // if (!fs.existsSync(path)) {
        //     // this.logger.debug('Archiver');
        //     // return await this.fileToArchive(fileBuffer, entitiesMap, mapId, filePath, noRewriteFiles);
        //     admZip = new AdmZip();
        // } else {
        //     admZip = new AdmZip(path);
        // }
        // this.logger.debug('Adm zip');
        // const jsonMap = await this.getMapInArchive();
        // jsonMap[mapId] = filePath;
        // this.logger.debug(jsonMap);
        // this.logger.debug(entitiesMap);
        // admZip.addFile(filePath, fileBuffer);
        //
        // const mapEntry = admZip.getEntry(this.mapName);
        // if (mapEntry) {
        //     admZip.updateFile(this.mapName, Buffer.from(JSON.stringify(jsonMap)));
        // } else {
        //     admZip.addFile(this.mapName, Buffer.from(JSON.stringify(jsonMap)));
        // }
        //
        // const mapEntities = admZip.getEntry(this.entitiesName);
        // if (mapEntities) {
        //     admZip.updateFile(this.entitiesName, Buffer.from(JSON.stringify(entitiesMap)));
        // } else {
        //     admZip.addFile(this.entitiesName, Buffer.from(JSON.stringify(entitiesMap)));
        // }
        //
        // admZip.writeZip(path);
    }

    public async getFile(filePath: string) {
        const path = await this.generatePath(filePath);
        if (!fs.existsSync(path)) {
            throw new Error('File not created!');
        }
        return fs.readFileSync(path);
    }

    public async generatePath(filePath: string): Promise<any> {
        const lastHash = await this.getLastHash();
        return this.basePath + '/' + lastHash + '/' + filePath;
    }

    public async generateDirPath(): Promise<string> {
        const lastHash = await this.mapService.getLastHash();
        return this.basePath + '/' + lastHash.hash;
    }

    public async fileToArchive(fileBuffer: Buffer, entitiesMap: object, mapId: string, filePath: string, noRewriteFiles = []): Promise<void> {
        noRewriteFiles.push(this.mapName, this.entitiesName);
        const zipPath = await this.zipPathGenerate();
        const zipCurrentFiles = await this.getFilesInZip();
        const jsonMap = await this.getMapInArchive();

        const output = fs.createWriteStream(zipPath);
        const archive = Archiver.create('zip');

        output.on('close', () => {
            this.logger.debug(archive.pointer() + ' total bytes');
            this.logger.debug('archiver has been finalized and the output file descriptor has closed.');
        });
        output.on('end', () => {
            this.logger.debug('Data has been drained');
        });

        archive.on('warning', (err) => {
            if (err.code === 'ENOENT') {
                this.logger.warn(err.message);
            } else {
                this.logger.error(err.message);
                throw err;
            }
        });

        archive.on('error', (err) => {
            this.logger.error(err.message);
            throw err;
        });

        archive.pipe(output);
        zipCurrentFiles.forEach((zipEntry) => {
            if (!noRewriteFiles.includes(zipEntry.entryName)) {
                archive.append(zipEntry.getData(), {name: zipEntry.entryName});
            }
        });
        jsonMap[mapId] = filePath;
        this.logger.debug(jsonMap);
        const bufferJson = Buffer.from(JSON.stringify(jsonMap));
        const entitiesBufferJson = Buffer.from(JSON.stringify(entitiesMap));
        archive.append(bufferJson, { name: this.mapName });
        archive.append(entitiesBufferJson, { name: this.entitiesName });
        archive.append(fileBuffer, { name: filePath });
        await archive.finalize();
    }

    public async getLastHash(): Promise<string> {
        let lastHash = await SyncTime.findLatestItem();
        if (!lastHash) {
            lastHash = new SyncTime();
            // tslint:disable-next-line:new-parens
            lastHash.hash = ((+new Date) + Math.random() * 100).toString(32);
            lastHash.createdAt = new Date();
            await lastHash.save();
        }
        lastHash = await SyncTime.findLatestItem();
        return lastHash.hash;
    }

    public async getZipName(): Promise<string> {
        const lastHash = await this.getLastHash();
        return lastHash + '.zip';
    }

    public async zipPathGenerate(): Promise<string> {
        const lastHash = await this.getLastHash();
        const path = this.getPath(lastHash, 'zip');
        this.zipPath = path;
        return path;
    }

    public getPath(fileName: string, fileExt: string): string {
        return this.basePath + '/' + fileName + '.' + fileExt;
    }

    public getEntitiesFileName() {
        return this.entitiesName;
    }

    public async getFilesInZip() {
        const path = await this.zipPathGenerate();
        let zipEntries = [];
        if (fs.existsSync(path)) {
            const admZip = new AdmZip(path);
            zipEntries = admZip.getEntries();
        }
        return zipEntries;
    }

    public async getFileInZip(fileName: string) {
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
            const buffer = await this.getFileInZip(this.mapName);
            return JSON.parse(buffer.toString());
        } catch (e) {
            return {};
        }
    }

    public async getEntitiesInArchive() {
        try {
            const buffer = await this.getFileInZip(this.entitiesName);
            return JSON.parse(buffer.toString());
        } catch (e) {
            return {};
        }
    }

    public async getFilesInBuffer(fileBuffer: Buffer) {
        const admZip = new AdmZip(fileBuffer);
        return admZip.getEntries();
    }

    public async getFileInBuffer(fileName: string, fileBuffer: Buffer) {
        const admZip = new AdmZip(fileBuffer);
        let zipEntry = admZip.getEntry(fileName);
        if (zipEntry) {
            return zipEntry.getData();
        }

        zipEntry = admZip.getEntry('/' + fileName);

        if (zipEntry) {
            return zipEntry.getData();
        }
        throw new Error('File not found!');
    }

    public async getMapInBuffer(fileBuffer: Buffer) {
        try {
            const buffer = await this.getFileInBuffer(this.mapName, fileBuffer);
            return JSON.parse(buffer.toString());
        } catch (e) {
            return {};
        }
    }

    public async getEntitiesInBuffer(fileBuffer: Buffer) {
        try {
            const buffer = await this.getFileInBuffer(this.entitiesName, fileBuffer);
            return JSON.parse(buffer.toString());
        } catch (e) {
            return {};
        }
    }
}
