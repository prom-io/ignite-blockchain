import {Column, Entity, PrimaryGeneratedColumn, BaseEntity} from 'typeorm';

@Entity()
export class SyncTime extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    hash: string;

    @Column({name: 'btfs_cid', nullable: true})
    btfsCid: string;

    @Column({type: 'timestamp', name: 'created_at'})
    createdAt: Date;

    @Column({type: 'boolean', default: false})
    synced: boolean;

    @Column({type: 'jsonb', name: 'file_map', default: {}})
    fileMap: object;

    @Column({type: 'jsonb', name: 'entity_map', default: {}})
    entityMap: object;

    @Column({
        type: 'jsonb', name: 'entity_map_posts', default: {
            posts: [],
        }
    })
    entityMapPosts: object;

    @Column({
        type: 'jsonb', name: 'entity_map_comments', default: {
            comments: [],
        }
    })
    entityMapComments: object;

    @Column({
        type: 'jsonb', name: 'entity_map_likes', default: {
            likes: [],
        }
    })
    entityMapLikes: object;

    @Column({
        type: 'jsonb', name: 'entity_map_unlikes', default: {
            unlikes: [],
        }
    })
    entityMapUnLikes: object;

    @Column({
        type: 'jsonb', name: 'entity_map_subscribes', default: {
            subscribes: [],
        }
    })
    entityMapSubscribes: object;

    @Column({
        type: 'jsonb', name: 'entity_map_unsubscribes', default: {
            unsubscribes: [],
        }
    })
    entityMapUnSubscribes: object;

    @Column({
        type: 'jsonb', name: 'entity_map_files', default: {
            images: [],
        }
    })
    entityMapFiles: object;

    @Column({
        type: 'jsonb', name: 'entity_map_users', default: {
            users: [],
        }
    })
    entityMapUsers: object;

    static async findLatestItem() {
        return this.createQueryBuilder('sync_time')
            .where('synced = false')
            .addOrderBy('created_at', 'DESC')
            .getOne();
    }

    static findAllNotSynced() {
        return this.createQueryBuilder('sync_time')
            .where('synced = false')
            .addOrderBy('created_at', 'ASC')
            .getMany();
    }
}

