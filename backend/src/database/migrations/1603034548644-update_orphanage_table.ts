import { MigrationInterface, QueryRunner } from "typeorm";

export class updateOrphanageTable1603034548644 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE orphanages
            ADD whatsapp VARCHAR(11)
        `)
        await queryRunner.query(`
            ALTER TABLE orphanages
            ADD approved BOOLEAN NOT NULL DEFAULT 0
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE orphanages
            DROP COLUMN whatsapp
        `)
        await queryRunner.query(`
            ALTER TABLE orphanages
            DROP COLUMN approved
        `)
    }

}
