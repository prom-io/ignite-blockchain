import {Body, Controller, Get, Header, Param, Post, Res, UploadedFile, UseInterceptors} from '@nestjs/common';
import {FileInterceptor} from '@nestjs/platform-express';
import { Response } from 'express';
import {UploadHandler} from './useCase/uploadFile/uploadHandler';
import {ArchiveHandler} from './useCase/archiveFile/archiveHandler';
import {UnzipHandler} from './useCase/unzipFile/unzipHandler';
import {Command as UploadCommand} from './useCase/uploadFile/command';
import * as fs from 'fs';
import {BtfsFetcher} from './fetchers/btfs.fetcher';

@Controller('/api/v1/soter')
export class SoterController {
    constructor(
        private readonly uploadHandler: UploadHandler,
        private readonly archiveFileHandler: ArchiveHandler,
        private readonly unzipFileHandler: UnzipHandler,
        private readonly btfsFetcher: BtfsFetcher,
    ) {}

    @Get('/entities/:cid')
    public async getEntities(@Param('cid') cid: string, @Res() res: Response) {
        try {
            const entities = await this.btfsFetcher.getEntities(cid);
            return res.status(200).send(entities);
        } catch (e) {
            return res.status(400).send({message: e.message});
        }
    }

    @Post('/upload')
    @UseInterceptors(
        FileInterceptor('file'),
    )
     public async uploadFile(
         @Body('id') id: string,
         @Body('peerWallet') peerWallet: string,
         @Body('peerIp') peerIp: string,
         @UploadedFile() file,
         @Res() res: Response,
    ) {
        await this.uploadHandler.handle(new UploadCommand(id, peerWallet, peerIp, file));
        return res.status(200).send({message: 'File success uploaded!'});
    }

    @Post('/archive')
    async archiveFiles(@Res() res: Response) {
        await this.archiveFileHandler.handle();
        return res.status(200).send({message: 'Hello'});
    }

    @Get('/unzip')
    @Header('Content-Disposition', 'attachment;')
    async unzipFile(@Res() res: Response) {
        const file = await this.unzipFileHandler.handle();
        return res.end(file);
    }

    @Get('/unzip/json')
    async unzipJson(@Res() res: Response) {
        const json = await this.unzipFileHandler.handle();
        console.log(JSON.parse(json.toString()));
        return res.send(JSON.parse(json.toString()));
    }
}
