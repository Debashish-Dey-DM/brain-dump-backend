import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class JournalTagMigration1741393086208 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'journal',
        columns: [
          { name: 'id', type: 'serial', isPrimary: true },
          { name: 'name', type: 'varchar', length: '255', isNullable: false },
          { name: 'content', type: 'text', isNullable: false },
          { name: 'status', type: 'varchar', length: '50', default: "'draft'" },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'tag',
        columns: [
          { name: 'id', type: 'serial', isPrimary: true },
          { name: 'name', type: 'varchar', length: '255', isNullable: false },
          {
            name: 'status',
            type: 'varchar',
            length: '50',
            default: "'active'",
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'journal_tags',
        columns: [
          { name: 'journal_id', type: 'int', isPrimary: true },
          { name: 'tag_id', type: 'int', isPrimary: true },
        ],
      }),
    );

    // Add Foreign Keys
    await queryRunner.createForeignKey(
      'journal_tags',
      new TableForeignKey({
        columnNames: ['journal_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'journal',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'journal_tags',
      new TableForeignKey({
        columnNames: ['tag_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tag',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('journal_tags');
    await queryRunner.dropTable('journal');
    await queryRunner.dropTable('tag');
  }
}
