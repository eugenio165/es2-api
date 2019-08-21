import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const swaggerBaseConfig = new DocumentBuilder()
    .setTitle('JWT-STARTER')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerBaseConfig);
  SwaggerModule.setup('api', app, swaggerDocument);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
