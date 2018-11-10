import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const PORT = process.env.PORT || 3001;
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  await app.listen(PORT);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
