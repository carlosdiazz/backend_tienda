import * as express from 'express';
import * as path from 'path';
import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';

//Modulos Propios
import { AppModule } from './app/app.module';
import { envs } from './config/envs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('MAIN');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remueve todo lo que no está incluído en los DTOs
      //forbidNonWhitelisted: true, // Retorna bad request si hay propiedades en el objeto no requeridas
    }),
  );

  // Habilitar CORS solo para peticiones GET
  app.enableCors({
    origin: '*', // Permitir todas las orígenes. Puedes restringirlo a dominios específicos
    methods: ['GET', 'POST'], // Solo permitir peticiones GET y POST
    //preflightContinue: false,
    //optionsSuccessStatus: 204,
  });

  // Configurar Express para servir archivos estáticos
  app.use(express.static(path.join(__dirname, '../public')));
  logger.debug(envs);
  await app.listen(envs.PORT);
  logger.debug(
    `👍Server up => PORT => ${process.env.PORT || 9999} 👍💪👍💪👍💪`,
  );
}
bootstrap();
