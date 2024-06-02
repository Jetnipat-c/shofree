import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

const envPath = '.env';

dotenv.config({
  path: envPath,
});

export const dataSourceConfig: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['dist/src/models/**/*.entity{.ts,.js}'],
  synchronize: process.env.DB_SYNCHRONIZE === 'true',
};

export const dataSource = new DataSource(dataSourceConfig);
