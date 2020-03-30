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

    static findLatestItem() {
        return this.createQueryBuilder('sync_time')
            .where('synced = false')
            .getOne();
    }
}
