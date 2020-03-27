import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateSyncTime1585294469001 implements MigrationInterface {
    name = 'CreateSyncTime1585294469001'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sync_time" ("id" SERIAL NOT NULL, "hash" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_a7fef7d64e7684511c6baaf57cc" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "sync_time" DROP COLUMN "createdAt"`, undefined);
        await queryRunner.query(`ALTER TABLE "sync_time" ADD "created_at" TIMESTAMP NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sync_time" DROP COLUMN "created_at"`, undefined);
        await queryRunner.query(`ALTER TABLE "sync_time" ADD "createdAt" TIMESTAMP NOT NULL`, undefined);
        await queryRunner.query(`DROP TABLE "sync_time"`, undefined);
    }

}
