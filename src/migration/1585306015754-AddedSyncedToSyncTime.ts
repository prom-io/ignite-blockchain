import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedSyncedToSyncTime1585306015754 implements MigrationInterface {
    name = 'AddedSyncedToSyncTime1585306015754'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sync_time" ADD "synced" boolean NOT NULL DEFAULT false`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sync_time" DROP COLUMN "synced"`, undefined);
    }

}
