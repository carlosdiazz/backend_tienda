import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigType } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';

//PROPIO
import { configVariable } from '../config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [configVariable.KEY],
      useFactory: (configService: ConfigType<typeof configVariable>) => {
        return {
          type: 'postgres',

          host: configService.POSTGRES.DB_HOST,
          port: configService.POSTGRES.DB_PORT,
          database: configService.POSTGRES.DB_NAME,
          username: configService.POSTGRES.DB_USER,
          password: configService.POSTGRES.DB_PASSWORD,
          autoLoadEntities: true,
          useTransactions: true,
          synchronize: true,
          ssl: true,
          extra: {
            ssl: {
              rejectUnauthorized: false,
            },
          },
          //Agregar configuracion para ssl
        } as DataSourceOptions;
      },
    }),
  ],
})
export class DatabaseModule {}
