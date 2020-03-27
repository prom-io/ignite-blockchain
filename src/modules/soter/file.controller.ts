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
        private readonly uploadHandler: UploadHandler,
    ) {}

    @Get('/:id')
    @Header('Content-Disposition', 'attachment;')
    public async getFileById(@Param('id') id: string, @Res() res: Response) {
        const file = await this.fileFetcher.getById(id);
        return res.end(file);
    }
    @Post('/upload')
    @UseInterceptors(
        FileInterceptor('file'),
    )
    public async uploadFile(@Body('id') id, @UploadedFile() file, @Res() res: Response) {
        await this.uploadHandler.handle(new UploadCommand(file, id));
        return res.status(200).send({message: 'File success uploaded!'});
    }
}
