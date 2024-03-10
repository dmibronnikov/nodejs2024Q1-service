import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { readFile } from 'fs/promises';
import { parse } from 'yaml';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const yamlSchema = await readFile('./doc/api.yaml', 'utf-8');
  const apiSchema = parse(yamlSchema);

  SwaggerModule.setup('api', app, apiSchema);

  await app.listen(4000);
}
bootstrap();
