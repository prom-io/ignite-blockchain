import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedBtfsCidColumngToSyncTime1585392458116 implements MigrationInterface {
    name = 'AddedBtfsCidColumngToSyncTime1585392458116'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sync_time" ADD "btfs_cid" character varying`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sync_time" DROP COLUMN "btfs_cid"`, undefined);
    }

}
