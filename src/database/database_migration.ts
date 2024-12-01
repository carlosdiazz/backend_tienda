import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import * as path from 'path';

// Especifica la ruta al archivo .env
const envPath = path.resolve(__dirname, '..', '..', '.env');

config({ path: envPath });
const configService = new ConfigService();

const database_migrations = new DataSource({
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  database: configService.get('DB_NAME'),
  username: configService.get('DB_USER'),
  password: configService.get('DB_PASSWORD'),
  synchronize: false,
  logging: true,
  entities: ['src/components/**/entities/*.entity{.ts,.js}'],
  migrations: ['src/database/migrations/*{.ts,.js}'],
});

export default database_migrations;
