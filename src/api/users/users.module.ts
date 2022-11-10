import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { PasswordService } from '../../common/utils/password.service';
import { User, UserSchema } from '../../domain/schemas';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ResponseData } from '../../common/utils/response-data.service';

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
  providers: [UsersService,PasswordService,ResponseData],
  exports: [UsersService,PasswordService]
})
export class UsersModule {}
