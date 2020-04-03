import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeMapsInSyncTime1585933426873 implements MigrationInterface {
    name = 'ChangeMapsInSyncTime1585933426873'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sync_time" ADD "entity_map_posts" jsonb NOT NULL DEFAULT '{}'`, undefined);
        await queryRunner.query(`ALTER TABLE "sync_time" ADD "entity_map_likes" jsonb NOT NULL DEFAULT '{}'`, undefined);
        await queryRunner.query(`ALTER TABLE "sync_time" ADD "entity_map_subscribes" jsonb NOT NULL DEFAULT '{}'`, undefined);
        await queryRunner.query(`ALTER TABLE "sync_time" ADD "entity_map_files" jsonb NOT NULL DEFAULT '{}'`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sync_time" DROP COLUMN "entity_map_files"`, undefined);
        await queryRunner.query(`ALTER TABLE "sync_time" DROP COLUMN "entity_map_subscribes"`, undefined);
        await queryRunner.query(`ALTER TABLE "sync_time" DROP COLUMN "entity_map_likes"`, undefined);
        await queryRunner.query(`ALTER TABLE "sync_time" DROP COLUMN "entity_map_posts"`, undefined);
    }

}
