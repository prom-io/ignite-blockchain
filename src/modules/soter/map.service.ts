import {Injectable} from '@nestjs/common';
import {SyncTime} from '../../model/syncTime.entity';

@Injectable()
export class MapService {
    public async updateMaps(fileMap: object, entityMap: object): Promise<void> {
        const lastHash = await SyncTime.findLatestItem();
        lastHash.fileMap = fileMap;
        lastHash.entityMap = entityMap;
        await lastHash.save();
    }

    public async getLastHash(): Promise<SyncTime> {
        let lastHash = await SyncTime.findLatestItem();
        if (!lastHash) {
            lastHash = new SyncTime();
            // tslint:disable-next-line:new-parens
            lastHash.hash = ((+new Date) + Math.random() * 100).toString(32);
            lastHash.createdAt = new Date();
            await lastHash.save();
        }
        lastHash = await SyncTime.findLatestItem();
        return lastHash;
    }
}
