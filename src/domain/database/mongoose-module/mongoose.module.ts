import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Global()
@Module({
    imports:[
        MongooseModule.forRootAsync({
            useFactory: async (configService: ConfigService) => ({
              uri: configService.get('DATABASE_URL'),
              useNewUrlParser: true
            }),
            inject: [ConfigService]
        })
    ]
})
export class MongooseDatabaseModule {}
