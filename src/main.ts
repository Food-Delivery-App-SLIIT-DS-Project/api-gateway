import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 3000;
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
  });
  app.setGlobalPrefix('api/v1');
  await app.listen(PORT, () => {
    console.log(`API Gateway is running on: http://localhost:${PORT}/api/v1`);
  });
}
void bootstrap();
