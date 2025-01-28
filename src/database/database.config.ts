// import { DataSource } from 'typeorm';

import { DataSource, DataSourceOptions } from 'typeorm';

// export const databaseProvider = [
//   {
//     provide: 'DATA_SOURCE',
//     useFactory: async () => {
//       const dataSource = new DataSource({
//         type: 'mysql',
//         host: 'localhost',
//         port: 3306,
//         username: 'root',
//         password: 'sql@1234',
//         database: 'tim_crm_sequelize',
//         entities: ["dist/**/*.entity{.ts,.js}"],
//         migrations: ["dist/database/migrations/*.js"],
//         synchronize: false,
//         logging: true,
//       });
//       return dataSource.initialize();
//     },
//   },
// ];

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'sql@1234',
  database: 'tim_crm_sequelize',
  entities: ['dist/**/*.entity{.js,.ts}'],
  migrations: ['dist/database/migrations/*.js'],
  synchronize: false,
  logging: true,
};
export const dataSource = new DataSource(dataSourceOptions);
dataSource
  .initialize()
  .then(() => console.log('Data Source has been initialized!'))
  .catch((err) =>
    console.error('Error during Data Source initialization', err),
  );
