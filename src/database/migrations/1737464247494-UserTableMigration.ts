import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserTableMigration1737464247494 implements MigrationInterface {
  name = 'UserTableMigration1737464247494';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(255) NOT NULL DEFAULT '', \`lastName\` varchar(255) NOT NULL DEFAULT '', \`fullName\` varchar(255) NOT NULL DEFAULT '', \`email\` varchar(255) NOT NULL DEFAULT '', \`phoneNumber\` varchar(255) NOT NULL DEFAULT '', \`countryCode\` varchar(255) NOT NULL DEFAULT '', \`city\` varchar(255) NOT NULL DEFAULT '', \`state\` varchar(255) NOT NULL DEFAULT '', \`password\` varchar(255) NOT NULL DEFAULT '', \`location\` geometry NOT NULL, \`latitude\` int NULL, \`longitude\` int NULL, \`userRole\` enum ('1', '2', '3', '4') NOT NULL DEFAULT '3', \`isActive\` tinyint NOT NULL DEFAULT 0, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``,
    );
    await queryRunner.query(`DROP TABLE \`user\``);
  }
}
