import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

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

    @Column({type: 'jsonb', name: 'entity_map_posts', default: {}})
    entityMapPosts: object;

    @Column({type: 'jsonb', name: 'entity_map_likes', default: {}})
    entityMapLikes: object;

    @Column({type: 'jsonb', name: 'entity_map_unlikes', default: {}})
    entityMapUnLikes: object;

    @Column({type: 'jsonb', name: 'entity_map_subscribes', default: {}})
    entityMapSubscribes: object;

    @Column({type: 'jsonb', name: 'entity_map_unsubscribes', default: {}})
    entityMapUnSubscribes: object;

    @Column({type: 'jsonb', name: 'entity_map_files', default: {}})
    entityMapFiles: object;

    @Column({type: 'jsonb', name: 'entity_map_users', default: {}})
    entityMapUsers: object;

    static findLatestItem() {
        return this.createQueryBuilder('sync_time')
            .where('synced = false')
            .getOne();
    }
}
