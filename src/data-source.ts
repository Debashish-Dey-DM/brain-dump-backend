import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true, // Must be false for migrations
  logging: true,
  entities: ['dist/**/*.entity.js'], // Adjust for compiled files
  migrations: ['dist/migrations/*.js'],
  migrationsTableName: 'migrations_history',
});

// ✅ Fix: Ensure ONLY `export default` is used
export default AppDataSource;
