// src/migrations/[timestamp]-create-audit-table.ts
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateAuditTable1698062400000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE audit_method_enum AS ENUM ('POST', 'PUT', 'DELETE')
        `);

        await queryRunner.createTable(
            new Table({
                name: 'audit',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'endpoint',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'object_name',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'row_id',
                        type: 'integer',
                        isNullable: false,
                    },
                    {
                        name: 'method',
                        type: 'audit_method_enum',
                        isNullable: false,
                    },
                    {
                        name: 'user_id',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'state',
                        type: 'jsonb',
                        isNullable: true,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                        isNullable: false,
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                        isNullable: false,
                    },
                ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('audit');
        await queryRunner.query(`DROP TYPE audit_method_enum`);
    }
}