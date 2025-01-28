import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCascadingToUsers1737697959333 implements MigrationInterface {
    name = 'AddCascadingToUsers1737697959333'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_b1992c0810048ed59a1b00835d4\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_b1992c0810048ed59a1b00835d4\` FOREIGN KEY (\`organizationIdId\`) REFERENCES \`organization\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_b1992c0810048ed59a1b00835d4\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_b1992c0810048ed59a1b00835d4\` FOREIGN KEY (\`organizationIdId\`) REFERENCES \`organization\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
