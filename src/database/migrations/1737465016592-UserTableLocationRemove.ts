import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserTableLocationRemove1737465016592
  implements MigrationInterface
{
  name = 'UserTableLocationRemove1737465016592';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`location\``);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`location\` geometry NOT NULL`,
    );
  }
}
