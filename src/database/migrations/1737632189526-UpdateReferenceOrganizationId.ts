import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateReferenceOrganizationId1737632189526
  implements MigrationInterface
{
  name = 'UpdateReferenceOrganizationId1737632189526';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_dfda472c0af7812401e592b6a61\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`organizationId\` \`organizationIdId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD CONSTRAINT \`FK_b1992c0810048ed59a1b00835d4\` FOREIGN KEY (\`organizationIdId\`) REFERENCES \`organization\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_b1992c0810048ed59a1b00835d4\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`organizationIdId\` \`organizationId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD CONSTRAINT \`FK_dfda472c0af7812401e592b6a61\` FOREIGN KEY (\`organizationId\`) REFERENCES \`organization\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
