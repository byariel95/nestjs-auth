import { Module } from '@nestjs/common';
import { HashPasswordService } from '../../common/utils/hash-password';
import { AuthService } from '../../domain/services/auth.service';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';

@Module({
  imports:[UsersModule],
  controllers: [AuthController],
  providers: [AuthService,HashPasswordService]
})
export class AuthModule {}
