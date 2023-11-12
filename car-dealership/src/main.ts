import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      // Whitelist solamente deja los datos requeridos, remueve datos extra.
      whitelist: true,
      // Regresa un error al enviar datos extra.
      forbidNonWhitelisted: true,
    })
  );

  await app.listen(3000);
}
bootstrap();
