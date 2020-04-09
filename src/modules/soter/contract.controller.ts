import {Controller, Get, Res} from '@nestjs/common';
import {ContractFetcher} from './fetchers/contract.fetcher';
import {Response} from 'express';
@Controller('/api/v1/cid')
export class ContractController {
    constructor(private readonly contractFetcher: ContractFetcher) {
    }

    @Get('/all')
    public async getAllCid(@Res() res: Response) {
        const allCid = await this.contractFetcher.getAllCid();
        return res.status(200).send({data: allCid});
    }
}
