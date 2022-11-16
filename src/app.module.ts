import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseDatabaseModule } from './domain/database/mongoose-module/mongoose.module';
import { getFileEnv } from './common/utils/env.helper';
import { ApiModule } from './api/api.module';

const envFilePath: string = getFileEnv();


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath,
      isGlobal: true
    }),
    MongooseDatabaseModule,
    ApiModule
  ]
})
export class AppModule {}
