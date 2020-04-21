import {Injectable, Logger} from '@nestjs/common';
import * as fs from 'fs';
import * as fse from 'fs-extra';
// @ts-ignore
import AdmZip = require('adm-zip');
import {MapService} from './map.service';

@Injectable()
export class ArchiveService {
    private readonly logger = new Logger(ArchiveService.name);
    private readonly basePath: string = './files';
    private readonly mapName: string = 'map.json';
    private readonly entitiesName: string = 'entities.json';
    private zipPath: string = '';

    constructor(private readonly mapService: MapService) {}

    public async addFile(fileBuffer: Buffer, mapId: string, filePath: string): Promise<void> {
        try {
            const path = await this.generatePath(filePath);
            const lastHash = await this.mapService.getLastHash();
            lastHash.fileMap[mapId] = filePath;
            await lastHash.save();
            await fse.outputFile(path, fileBuffer);
            this.logger.debug('File success saved!');
        } catch (e) {
            this.logger.error(e.message);
        }
    }

    public async getFile(filePath: string) {
        const path = await this.generatePath(filePath);
        if (!fs.existsSync(path)) {
            throw new Error('File not created!');
        }
        return fs.readFileSync(path);
    }

    public async generatePath(filePath: string): Promise<any> {
        const lastHash = await this.mapService.getLastHash();
        return this.basePath + '/' + lastHash.hash + '/' + filePath;
    }

    public generateDirPath(hash: string): string {
        return this.basePath + '/' + hash;
    }

    public async zipPathGenerate(): Promise<string> {
        const lastHash = await this.mapService.getLastHash();
        const path = this.getPath(lastHash.hash, 'zip');
        this.zipPath = path;
        return path;
    }

    public getPath(fileName: string, fileExt: string): string {
        return this.basePath + '/' + fileName + '.' + fileExt;
    }

    public getEntitiesFileName() {
        return this.entitiesName;
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

    public getFilesInBuffer(fileBuffer: Buffer) {
        const admZip = new AdmZip(fileBuffer);
        return admZip.getEntries();
    }

    public getFileInBuffer(fileName: string, fileBuffer: Buffer) {
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
            const buffer = this.getFileInBuffer(this.mapName, fileBuffer);
            return JSON.parse(buffer.toString());
        } catch (e) {
            return {};
        }
    }
}
