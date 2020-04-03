import {MigrationInterface, QueryRunner} from "typeorm";

export class JsonMapsAddedToSyncTime1585907595807 implements MigrationInterface {
    name = 'JsonMapsAddedToSyncTime1585907595807'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sync_time" ADD "file_map" jsonb NOT NULL DEFAULT '{}'`, undefined);
        await queryRunner.query(`ALTER TABLE "sync_time" ADD "entity_map" jsonb NOT NULL DEFAULT '{}'`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sync_time" DROP COLUMN "entity_map"`, undefined);
        await queryRunner.query(`ALTER TABLE "sync_time" DROP COLUMN "file_map"`, undefined);
    }

}
