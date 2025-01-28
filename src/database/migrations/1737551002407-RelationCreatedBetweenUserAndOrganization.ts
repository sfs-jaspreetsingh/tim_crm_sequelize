import { MigrationInterface, QueryRunner } from 'typeorm';

export class RelationCreatedBetweenUserAndOrganization1737551002407
  implements MigrationInterface
{
  name = 'RelationCreatedBetweenUserAndOrganization1737551002407';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`organizationId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD CONSTRAINT \`FK_dfda472c0af7812401e592b6a61\` FOREIGN KEY (\`organizationId\`) REFERENCES \`organization\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_dfda472c0af7812401e592b6a61\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP COLUMN \`organizationId\``,
    );
  }
}
