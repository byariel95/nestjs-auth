import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from '../../domain/services';
import { CreateUserDto } from './dto/register-user.dro';

@ApiTags('Routes for users')
@Controller()
export class UsersController 
{
  constructor(private readonly usersService: UsersService) {}

  @Post('user/new')
  @ApiOperation({ summary: 'create a new User' })
  async saveUser(@Body() createUserDTO: CreateUserDto ) 
  {
    return this.usersService.createUser(createUserDTO);
  }
}
