import {MigrationInterface, QueryRunner} from "typeorm";

export class DefaultAddedToSyncTime1586971622370 implements MigrationInterface {
    name = 'DefaultAddedToSyncTime1586971622370'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sync_time" ALTER COLUMN "entity_map_posts" SET DEFAULT '{"posts":[]}'`, undefined);
        await queryRunner.query(`ALTER TABLE "sync_time" ALTER COLUMN "entity_map_comments" SET DEFAULT '{"comments":[]}'`, undefined);
        await queryRunner.query(`ALTER TABLE "sync_time" ALTER COLUMN "entity_map_likes" SET DEFAULT '{"likes":[]}'`, undefined);
        await queryRunner.query(`ALTER TABLE "sync_time" ALTER COLUMN "entity_map_unlikes" SET DEFAULT '{"unlikes":[]}'`, undefined);
        await queryRunner.query(`ALTER TABLE "sync_time" ALTER COLUMN "entity_map_subscribes" SET DEFAULT '{"subscribes":[]}'`, undefined);
        await queryRunner.query(`ALTER TABLE "sync_time" ALTER COLUMN "entity_map_unsubscribes" SET DEFAULT '{"unsubscribes":[]}'`, undefined);
        await queryRunner.query(`ALTER TABLE "sync_time" ALTER COLUMN "entity_map_files" SET DEFAULT '{"images":[]}'`, undefined);
        await queryRunner.query(`ALTER TABLE "sync_time" ALTER COLUMN "entity_map_users" SET DEFAULT '{"users":[]}'`, undefined);
        await queryRunner.query(`ALTER TABLE "sync_time" ALTER COLUMN "entity_map_posts" SET DEFAULT '{"posts":[]}'`, undefined);
        await queryRunner.query(`ALTER TABLE "sync_time" ALTER COLUMN "entity_map_comments" SET DEFAULT '{"comments":[]}'`, undefined);
        await queryRunner.query(`ALTER TABLE "sync_time" ALTER COLUMN "entity_map_likes" SET DEFAULT '{"likes":[]}'`, undefined);
        await queryRunner.query(`ALTER TABLE "sync_time" ALTER COLUMN "entity_map_unlikes" SET DEFAULT '{"unlikes":[]}'`, undefined);
        await queryRunner.query(`ALTER TABLE "sync_time" ALTER COLUMN "entity_map_subscribes" SET DEFAULT '{"subscribes":[]}'`, undefined);
        await queryRunner.query(`ALTER TABLE "sync_time" ALTER COLUMN "entity_map_unsubscribes" SET DEFAULT '{"unsubscribes":[]}'`, undefined);
        await queryRunner.query(`ALTER TABLE "sync_time" ALTER COLUMN "entity_map_files" SET DEFAULT '{"images":[]}'`, undefined);
        await queryRunner.query(`ALTER TABLE "sync_time" ALTER COLUMN "entity_map_users" SET DEFAULT '{"users":[]}'`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sync_time" ALTER COLUMN "entity_map_users" SET DEFAULT '{"users": []}'`, undefined);
        await queryRunner.query(`ALTER TABLE "sync_time" ALTER COLUMN "entity_map_files" SET DEFAULT '{"images": []}'`, undefined);
        await queryRunner.query(`ALTER TABLE "sync_time" ALTER COLUMN "entity_map_unsubscribes" SET DEFAULT '{"unsubscribes": []}'`, undefined);
        await queryRunner.query(`ALTER TABLE "sync_time" ALTER COLUMN "entity_map_subscribes" SET DEFAULT '{"subscribes": []}'`, undefined);
        await queryRunner.query(`ALTER TABLE "sync_time" ALTER COLUMN "entity_map_unlikes" SET DEFAULT '{"unlikes": []}'`, undefined);
        await queryRunner.query(`ALTER TABLE "sync_time" ALTER COLUMN "entity_map_likes" SET DEFAULT '{"likes": []}'`, undefined);
        await queryRunner.query(`ALTER TABLE "sync_time" ALTER COLUMN "entity_map_comments" SET DEFAULT '{"comments": []}'`, undefined);
        await queryRunner.query(`ALTER TABLE "sync_time" ALTER COLUMN "entity_map_posts" SET DEFAULT '{"posts": []}'`, undefined);
        await queryRunner.query(`ALTER TABLE "sync_time" ALTER COLUMN "entity_map_users" SET DEFAULT '{"users": []}'`, undefined);
        await queryRunner.query(`ALTER TABLE "sync_time" ALTER COLUMN "entity_map_files" SET DEFAULT '{"images": []}'`, undefined);
        await queryRunner.query(`ALTER TABLE "sync_time" ALTER COLUMN "entity_map_unsubscribes" SET DEFAULT '{"unsubscribes": []}'`, undefined);
        await queryRunner.query(`ALTER TABLE "sync_time" ALTER COLUMN "entity_map_subscribes" SET DEFAULT '{"subscribes": []}'`, undefined);
        await queryRunner.query(`ALTER TABLE "sync_time" ALTER COLUMN "entity_map_unlikes" SET DEFAULT '{"unlikes": []}'`, undefined);
        await queryRunner.query(`ALTER TABLE "sync_time" ALTER COLUMN "entity_map_likes" SET DEFAULT '{"likes": []}'`, undefined);
        await queryRunner.query(`ALTER TABLE "sync_time" ALTER COLUMN "entity_map_comments" SET DEFAULT '{"comments": []}'`, undefined);
        await queryRunner.query(`ALTER TABLE "sync_time" ALTER COLUMN "entity_map_posts" SET DEFAULT '{"posts": []}'`, undefined);
    }

}
