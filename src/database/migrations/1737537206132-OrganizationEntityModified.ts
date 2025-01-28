import { MigrationInterface, QueryRunner } from 'typeorm';

export class OrganizationEntityModified1737537206132
  implements MigrationInterface
{
  name = 'OrganizationEntityModified1737537206132';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`organization\` DROP COLUMN \`organizationEmail\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization\` ADD \`organizationEmail\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization\` ADD UNIQUE INDEX \`IDX_077c1a364d139887c510176cd4\` (\`organizationEmail\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization\` DROP COLUMN \`organizationUniqueId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization\` ADD \`organizationUniqueId\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization\` ADD UNIQUE INDEX \`IDX_9888db953129a60bff025d41b9\` (\`organizationUniqueId\`)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`organization\` DROP INDEX \`IDX_9888db953129a60bff025d41b9\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization\` DROP COLUMN \`organizationUniqueId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization\` ADD \`organizationUniqueId\` text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization\` DROP INDEX \`IDX_077c1a364d139887c510176cd4\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization\` DROP COLUMN \`organizationEmail\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization\` ADD \`organizationEmail\` text NOT NULL`,
    );
  }
}
