import {Body, Controller, Get, Header, Param, Post, Res, UploadedFile, UseInterceptors} from '@nestjs/common';
import {FileInterceptor} from '@nestjs/platform-express';
import { Response } from 'express';
import {UploadHandler} from './useCase/uploadFile/uploadHandler';
import {ArchiveHandler} from './useCase/archiveFile/archiveHandler';
import {UnzipHandler} from './useCase/unzipFile/unzipHandler';
import {Command as UploadCommand} from './useCase/uploadFile/command';
import * as fs from 'fs';
import {FileFetcher} from './fetchers/file.fetcher';

@Controller('/v1/file')
export class FileController {
    constructor(
        private readonly fileFetcher: FileFetcher,
    ) {}

    @Get('/test')
    @Header('Content-Disposition', 'attachment;')
    public async test(@Res() res: Response) {
        const file = await this.fileFetcher.test();
        return res.end(file);
    }

    @Get('/:id')
    @Header('Content-Disposition', 'attachment;')
    public async getFileById(@Param('id') id: string, @Res() res: Response) {
        const file = await this.fileFetcher.getById(id);
        return res.end(file);
    }
}
