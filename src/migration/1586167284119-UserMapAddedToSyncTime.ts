import {MigrationInterface, QueryRunner} from "typeorm";

export class UserMapAddedToSyncTime1586167284119 implements MigrationInterface {
    name = 'UserMapAddedToSyncTime1586167284119'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sync_time" ALTER COLUMN "entity_map_users" SET DEFAULT '{"users":[]}'`, undefined);
        await queryRunner.query(`ALTER TABLE "sync_time" ALTER COLUMN "entity_map_users" SET DEFAULT '{}'`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sync_time" ALTER COLUMN "entity_map_users" SET DEFAULT '{"users": []}'`, undefined);
        await queryRunner.query(`ALTER TABLE "sync_time" ALTER COLUMN "entity_map_users" SET DEFAULT '{"users": []}'`, undefined);
    }

}
