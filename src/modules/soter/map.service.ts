import {Injectable} from '@nestjs/common';
import {SyncTime} from '../../model/syncTime.entity';

@Injectable()
export class MapService {
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

    public async pushFile(fileId: string, peerWallet: string, peerIp: string): Promise<void> {
        const lastHash = await this.getLastHash();
        // @ts-ignore
        if (!lastHash.entityMapFiles.images) {
            // @ts-ignore
            lastHash.entityMapFiles.images = [];
        }
        // @ts-ignore
        lastHash.entityMapFiles.images.push({fileId, peerWallet, peerIp});
        await lastHash.save();
    }

    public async pushPost(postId: string, peerWallet: string, peerIp: string): Promise<void> {
        const lastHash = await this.getLastHash();
        // @ts-ignore
        if (!lastHash.entityMapPosts.posts) {
            // @ts-ignore
            lastHash.entityMapPosts.posts = [];
        }
        // @ts-ignore
        lastHash.entityMapPosts.posts.push({postId, peerWallet, peerIp});
        await lastHash.save();
    }

    public async pushUser(userId: string, peerWallet: string, peerIp: string): Promise<void> {
        const lastHash = await this.getLastHash();
        // @ts-ignore
        if (!lastHash.entityMapUsers.users) {
            // @ts-ignore
            lastHash.entityMapUsers.users = [];
        }
        // @ts-ignore
        lastHash.entityMapUsers.users.push({userId, peerWallet, peerIp});
        await lastHash.save();
    }

    public async pushComment(commentId: string, postId: string, peerWallet: string, peerIp: string): Promise<void> {
        const lastHash = await this.getLastHash();
        // @ts-ignore
        if (!lastHash.entityMapComments.comments) {
            // @ts-ignore
            lastHash.entityMapComments.comments = [];
        }
        // @ts-ignore
        lastHash.entityMapComments.comments.push({commentId, postId, peerWallet, peerIp});
        await lastHash.save();
    }

    public async pushLike(id: string, commentId: string, peerWallet: string, peerIp: string): Promise<void> {
        const lastHash = await this.getLastHash();
        // @ts-ignore
        if (!lastHash.entityMapLikes.likes) {
            // @ts-ignore
            lastHash.entityMapLikes.likes = [];
        }
        // @ts-ignore
        lastHash.entityMapLikes.likes.push({id, commentId, peerWallet, peerIp});
        await lastHash.save();
    }

    public async pushUnLike(id: string, commentId: string, peerWallet: string, peerIp: string): Promise<void> {
        const lastHash = await this.getLastHash();
        // @ts-ignore
        if (!lastHash.entityMapUnLikes.unlikes) {
            // @ts-ignore
            lastHash.entityMapUnLikes.unlikes = [];
        }
        // @ts-ignore
        lastHash.entityMapUnLikes.unlikes.push({id, commentId, peerWallet, peerIp});
        await lastHash.save();
    }

    public async pushSubscribe(id: string, userId: string, peerWallet: string, peerIp: string): Promise<void> {
        const lastHash = await this.getLastHash();
        // @ts-ignore
        if (!lastHash.entityMapSubscribes.subscribes) {
            // @ts-ignore
            lastHash.entityMapSubscribes.subscribes = [];
        }
        // @ts-ignore
        lastHash.entityMapSubscribes.subscribes.push({id, userId, peerWallet, peerIp});
        await lastHash.save();
    }

    public async pushUnSubscribe(id: string, userId: string, peerWallet: string, peerIp: string): Promise<void> {
        const lastHash = await this.getLastHash();
        // @ts-ignore
        if (!lastHash.entityMapUnSubscribes.unsubscribes) {
            // @ts-ignore
            lastHash.entityMapUnSubscribes.unsubscribes = [];
        }
        // @ts-ignore
        lastHash.entityMapUnSubscribes.unsubscribes.push({id, userId, peerWallet, peerIp});
        await lastHash.save();
    }
}
