import { NestFactory} from '@nestjs/core';
import { Logger, ValidationPipe,} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { initSwagger } from './app.swagger';
import { AllExceptionFilter } from './common/filters/http-exception.filter';
import * as basicAuth from 'express-basic-auth'
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = new Logger('main');
  const config = app.get(ConfigService);
  const port = parseInt(config.get<string>('PORT'), 10);

  app.use(compression());
  app.enableCors();
  app.setGlobalPrefix('api');
  app.use(
    ['/api/docs', '/api/docs'],
    basicAuth({
      challenge: true,
      users: {
        [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD,
      },
    }),
  );
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted:true
  }));

  app.useGlobalFilters(new AllExceptionFilter());

  initSwagger(app);
  await app.listen(port);
  logger.debug(`Server is running at ${await app.getUrl()}/api/docs`);
}
bootstrap();
