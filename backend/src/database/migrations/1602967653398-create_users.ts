import { query } from "express";
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createUser1602949119608 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		queryRunner.createTable(new Table({
			name: 'users',
			columns: [
				{
					name: 'id',
					type: 'integer',
					unsigned: true,
					isPrimary: true,
					isGenerated: true,
					generationStrategy: 'increment',
				},
				{
					name: 'name',
					type: 'varchar',
				},
				{
					name: 'email',
					type: 'varchar',
					isUnique: true,
				},
				{
					name: 'password',
					type: 'varchar',
				},
				{
					name: 'created_at',
					type: 'timestamp',
					default: `date('now')`,
				},
				{
					name: 'password_reset_token',
					type: 'varchar',
					isNullable: true,
				},
				{
					name: 'password_reset_token_expiration',
					type: 'timestamp',
					isNullable: true,
				}
			]
		}))

	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		queryRunner.dropTable('users')
	}

}
