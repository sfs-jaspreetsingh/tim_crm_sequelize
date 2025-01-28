import { MigrationInterface, QueryRunner } from 'typeorm';

export class OrganizationTableAdd1737531100280 implements MigrationInterface {
  name = 'OrganizationTableAdd1737531100280';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`organization\` (\`id\` int NOT NULL AUTO_INCREMENT, \`organizationName\` text NOT NULL, \`organizationLogo\` text NOT NULL, \`organizationEmail\` text NOT NULL, \`organizationNumber\` text NOT NULL, \`organizationAddress\` text NOT NULL, \`organizationUniqueId\` text NOT NULL, \`organizationBillingAccountDetails\` json NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`organization\``);
  }
}
