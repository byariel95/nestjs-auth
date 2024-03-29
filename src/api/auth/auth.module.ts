import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt-strategy';
import { ResponseData } from '../../common/utils/response-data.service';

@Module({
  imports:[
    PassportModule.register({ defaultStrategy: 'jwt'}),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '24h' },
      }),
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy,ResponseData],
  exports: [JwtStrategy,PassportModule],
})
export class AuthModule {}
