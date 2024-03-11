import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { readFile } from 'fs/promises';
import { parse } from 'yaml';
import { ResponseTransformerInterceptor } from './interceptors/response.transformer';

const port = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ResponseTransformerInterceptor());

  const yamlSchema = await readFile('./doc/api.yaml', 'utf-8');
  const apiSchema = parse(yamlSchema);

  SwaggerModule.setup('api', app, apiSchema);

  await app.listen(port);
}
bootstrap();
