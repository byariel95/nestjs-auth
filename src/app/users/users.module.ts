import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
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
  providers: [UsersService]
})
export class UsersModule {}
