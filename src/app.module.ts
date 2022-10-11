import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseDatabaseModule } from './common/database/mongoose-module/mongoose.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProductsModule } from './modules/products/products.module';
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseDatabaseModule,
    UsersModule,
    AuthModule,
    ProductsModule,
    CloudinaryModule,
  ]
})
export class AppModule {}
