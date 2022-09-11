import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { PasswordService } from '../../common/utils/password.service';
import { User, UserSchema } from '../../domain/schemas';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      }
    ])
  ],
  controllers: [UsersController],
  providers: [UsersService,PasswordService],
  exports: [UsersService,PasswordService]
})
export class UsersModule {}
