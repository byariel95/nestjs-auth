import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseDatabaseModule } from './common/database/mongoose-module/mongoose.module';
import { UsersModule } from './api/users/users.module';
import { AuthModule } from './api/auth/auth.module';
import { ProductsModule } from './api/products/products.module';
import { CloudinaryModule } from './api/cloudinary/cloudinary.module';
import { CategoryModule } from './api/category/category.module';
import { getFileEnv } from './common/utils/env.helper';

const envFilePath: string = getFileEnv();


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath,
      isGlobal: true
    }),
    MongooseDatabaseModule,
    UsersModule,
    AuthModule,
    ProductsModule,
    CloudinaryModule,
    CategoryModule,
  ]
})
export class AppModule {}
