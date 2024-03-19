import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
      methods: ['GET','HEAD','PUT','PATCH','POST','DELETE'],
      allowedHeaders: ['Content-type', 'Accept', 'Authorization', 'Access-Control-Allow-Origin' ]
  })
  await app.listen(8000);
}
bootstrap();
