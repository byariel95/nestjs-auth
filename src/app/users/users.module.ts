import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HashPasswordService } from '../../common/utils/hash-password';
import { User, UserSchema } from '../../domain/schemas';
import { UsersService } from '../../domain/services';
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
  providers: [UsersService,HashPasswordService],
  exports: [UsersService]
})
export class UsersModule {}
