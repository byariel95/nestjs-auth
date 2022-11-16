import { DocumentBuilder , SwaggerModule} from '@nestjs/swagger';
import { INestApplication} from '@nestjs/common';

export const initSwagger = (app: INestApplication) => {
    const swaggerConfig = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('NestJS API')
    .setDescription('This is full rest API with similar DDD architecture  and best practices ') 
    .setVersion('3.0')
    .build();
    const document = SwaggerModule.createDocument(app,swaggerConfig);
    SwaggerModule.setup('api/docs',app, document,{
        swaggerOptions:{
            filter:true
        }
    });
};