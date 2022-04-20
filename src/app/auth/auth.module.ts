import { Module } from '@nestjs/common';
import { AuthService } from '../../domain/services/auth.service';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
