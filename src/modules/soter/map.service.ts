import {Injectable} from '@nestjs/common';
import {SyncTime} from '../../model/syncTime.entity';
import {getConnection, UpdateResult} from 'typeorm';
import {SchedulerRegistry} from '@nestjs/schedule';

@Injectable()
export class MapService {
    constructor(private schedulerRegistry: SchedulerRegistry) {}

    public async getLastHash(): Promise<SyncTime> {
        let lastHash = await SyncTime.findLatestItem();
        if (!lastHash) {
            lastHash = await this.create();
        }
        return lastHash;
    }

    public async create() {
        const lastHash = new SyncTime();
        // tslint:disable-next-line:new-parens
        lastHash.hash = ((+new Date) + Math.random() * 100).toString(32);
        lastHash.createdAt = new Date();
        await lastHash.save();
        return lastHash;
    }

    public async update(id: number, querySet: object): Promise<UpdateResult> {
        return getConnection()
            .createQueryBuilder()
            .update(SyncTime)
            .set(querySet)
            .where('id = :id', { id })
            .execute();
    }

    public async pushFile(fileId: string, peerWallet: string, peerIp: string): Promise<UpdateResult> {
        const lastHash = await this.getLastHash();
        const data = JSON.stringify({fileId, peerWallet, peerIp});
        const querySet = {
            entityMapFiles: () => `jsonb_set(entity_map_files, '{images, 99999}', '${data}')`,
        };
        return await this.update(lastHash.id, querySet);
        // const lastHash = await this.getLastHash();
        // // @ts-ignore
        // if (!lastHash.entityMapFiles.images) {
        //     // @ts-ignore
        //     lastHash.entityMapFiles.images = [];
        // }
        // // @ts-ignore
        // lastHash.entityMapFiles.images.push({fileId, peerWallet, peerIp});
        // await lastHash.save();
    }

    public async pushPost(postId: string, peerWallet: string, peerIp: string): Promise<UpdateResult> {
        const job = this.schedulerRegistry.getCronJob('sync');
        const dates = job.nextDates(1);
        const dateJob = new Date(dates[0].toDate());
        const nowDate = new Date();
        // @ts-ignore
        const difference = (dateJob - nowDate) / 1000;
        let lastHash;
        if (difference > 40) {
            lastHash = await this.create();
        } else {
            lastHash = await this.getLastHash();
        }
        const data = JSON.stringify({postId, peerWallet, peerIp});
        const querySet = {
            entityMapPosts: () => `jsonb_set(entity_map_posts, '{posts, 99999}', '${data}')`,
        };
        return await this.update(lastHash.id, querySet);
        // const lastHash = await this.getLastHash();
        // // @ts-ignore
        // if (!lastHash.entityMapPosts.posts) {
        //     // @ts-ignore
        //     lastHash.entityMapPosts.posts = [];
        // }
        // // @ts-ignore
        // lastHash.entityMapPosts.posts.push({postId, peerWallet, peerIp});
        // await lastHash.save();
    }

    public async pushUser(userId: string, peerWallet: string, peerIp: string): Promise<UpdateResult> {
        const lastHash = await this.getLastHash();
        const data = JSON.stringify({userId, peerWallet, peerIp});
        const querySet = {
            entityMapUsers: () => `jsonb_set(entity_map_users, '{users, 99999}', '${data}')`,
        };
        return await this.update(lastHash.id, querySet);
        // const lastHash = await this.getLastHash();
        // // @ts-ignore
        // if (!lastHash.entityMapUsers.users) {
        //     // @ts-ignore
        //     lastHash.entityMapUsers.users = [];
        // }
        // // @ts-ignore
        // lastHash.entityMapUsers.users.push({userId, peerWallet, peerIp});
        // await lastHash.save();
    }

    public async pushComment(commentId: string, postId: string, peerWallet: string, peerIp: string): Promise<UpdateResult> {
        const lastHash = await this.getLastHash();
        const data = JSON.stringify({commentId, postId, peerWallet, peerIp});
        const querySet = {
            entityMapComments: () => `jsonb_set(entity_map_comments, '{comments, 99999}', '${data}')`,
        };
        return await this.update(lastHash.id, querySet);
        // const lastHash = await this.getLastHash();
        // // @ts-ignore
        // if (!lastHash.entityMapComments.comments) {
        //     // @ts-ignore
        //     lastHash.entityMapComments.comments = [];
        // }
        // // @ts-ignore
        // lastHash.entityMapComments.comments.push({commentId, postId, peerWallet, peerIp});
        // await lastHash.save();
    }

    public async pushLike(id: string, commentId: string, peerWallet: string, peerIp: string): Promise<UpdateResult> {
        const lastHash = await this.getLastHash();
        const data = JSON.stringify({id, commentId, peerWallet, peerIp});
        const querySet = {
            entityMapLikes: () => `jsonb_set(entity_map_likes, '{likes, 99999}', '${data}')`,
        };
        return await this.update(lastHash.id, querySet);
        // const lastHash = await this.getLastHash();
        // // @ts-ignore
        // if (!lastHash.entityMapLikes.likes) {
        //     // @ts-ignore
        //     lastHash.entityMapLikes.likes = [];
        // }
        // // @ts-ignore
        // lastHash.entityMapLikes.likes.push({id, commentId, peerWallet, peerIp});
        // await lastHash.save();
    }

    public async pushUnLike(id: string, commentId: string, peerWallet: string, peerIp: string): Promise<UpdateResult> {
        const lastHash = await this.getLastHash();
        const data = JSON.stringify({id, commentId, peerWallet, peerIp});
        const querySet = {
            entityMapUnLikes: () => `jsonb_set(entity_map_unlikes, '{unlikes, 99999}', '${data}')`,
        };
        return await this.update(lastHash.id, querySet);
        // const lastHash = await this.getLastHash();
        // // @ts-ignore
        // if (!lastHash.entityMapUnLikes.unlikes) {
        //     // @ts-ignore
        //     lastHash.entityMapUnLikes.unlikes = [];
        // }
        // // @ts-ignore
        // lastHash.entityMapUnLikes.unlikes.push({id, commentId, peerWallet, peerIp});
        // await lastHash.save();
    }

    public async pushSubscribe(id: string, userId: string, peerWallet: string, peerIp: string): Promise<UpdateResult> {
        const lastHash = await this.getLastHash();
        const data = JSON.stringify({id, userId, peerWallet, peerIp});
        const querySet = {
            entityMapSubscribes: () => `jsonb_set(entity_map_subscribes, '{subscribes, 99999}', '${data}')`,
        };
        return await this.update(lastHash.id, querySet);
        // const lastHash = await this.getLastHash();
        // // @ts-ignore
        // if (!lastHash.entityMapSubscribes.subscribes) {
        //     // @ts-ignore
        //     lastHash.entityMapSubscribes.subscribes = [];
        // }
        // // @ts-ignore
        // lastHash.entityMapSubscribes.subscribes.push({id, userId, peerWallet, peerIp});
        // await lastHash.save();
    }

    public async pushUnSubscribe(id: string, userId: string, peerWallet: string, peerIp: string): Promise<UpdateResult> {
        const lastHash = await this.getLastHash();
        const data = JSON.stringify({id, userId, peerWallet, peerIp});
        const querySet = {
            entityMapUnSubscribes: () => `jsonb_set(entity_map_unsubscribes, '{unsubscribes, 99999}', '${data}')`,
        };
        return await this.update(lastHash.id, querySet);
        // const lastHash = await this.getLastHash();
        // // @ts-ignore
        // if (!lastHash.entityMapUnSubscribes.unsubscribes) {
        //     // @ts-ignore
        //     lastHash.entityMapUnSubscribes.unsubscribes = [];
        // }
        // // @ts-ignore
        // lastHash.entityMapUnSubscribes.unsubscribes.push({id, userId, peerWallet, peerIp});
        // await lastHash.save();
    }
}
