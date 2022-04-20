import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { MongooseDatabaseModule } from './common/database/mongoose-module/mongoose.module';
import { UsersModule } from './app/users/users.module';
import { AuthModule } from './app/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseDatabaseModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController]
})
export class AppModule {}
