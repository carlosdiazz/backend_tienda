import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default';

// Modulos Propios
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '../database/database.module';

import {
  EmpresaModule,
  ProductosModule,
  RoleModule,
  UsersModule,
  ProveedorModule,
  ClientesModule,
  FacturaModule,
  FacturaDetalle,
} from './../components';
import { AppInit } from './app-init.service';
import { AuthModule } from '../auth';
import { configVariable, validationENV } from '../config';

const isProduction = process.env.STATE === 'PROD';

const apolloPlugin = isProduction
  ? ApolloServerPluginLandingPageProductionDefault
  : ApolloServerPluginLandingPageLocalDefault;

const baseImports = [
  ConfigModule.forRoot({
    envFilePath: [`.env.${process.env.STATE || 'DEV'}`],
    load: [configVariable],
    isGlobal: true,
    validationSchema: validationENV(),
  }),

  GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: join(process.cwd(), './../schema.gql'),
    playground: false, // Deshabilita la consola de GraphQL Playground en producción
    plugins: [apolloPlugin()], // Utiliza el plugin de landing page de Apollo para producción
    context: ({ req }) => ({ req }), // Configura el contexto con la solicitud HTTP
    introspection: isProduction ? false : true, // Deshabilita la introspección en producción
    persistedQueries: false,
    fieldResolverEnhancers: ['interceptors'],
  }),

  //Componentes de Auth
  AuthModule,

  //Base de Datos
  DatabaseModule,

  //Compoenntes de User
  UsersModule,
  RoleModule,
  ProductosModule,
  EmpresaModule,
  ProveedorModule,
  ClientesModule,
  FacturaModule,
  FacturaDetalle,
];

@Module({
  providers: [AppService, AppInit],
  imports: baseImports,
  controllers: [AppController],
})
export class AppModule {}
