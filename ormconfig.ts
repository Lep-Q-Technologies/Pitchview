/* eslint-disable @typescript-eslint/no-var-requires */
import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
require('dotenv').config();

const datasourceOptions: PostgresConnectionOptions = {
  name: 'default',
  type: 'postgres',
  port: 5432,
  logging: true,
  logger: `advanced-console`,
  migrationsTableName: 'typeorm_migrations',
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  entities: ['dist/src/typeorm/entity/**/*.js'],
  migrations: ['dist/src/typeorm/migrations/**/*.js']
};

// Currently the entities and migrations are pointing to the dist folder for the app to work on Netlify
// When running a migration, the entities and migrations need to point to the src folder and typescript files

export default new DataSource(datasourceOptions);
