import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RegisterUserDto } from './dto';
import { HashPasswordService } from '../../common/utils/hash-password';
import { Roles } from '../../common/enums/role.enum';
import { AuthService } from '../../domain/services/auth.service';
import { UsersService } from '../../domain/services';

@ApiTags('Routes for Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly hashPasswordService: HashPasswordService,
    private readonly usersService: UsersService,
    ) {}
  
  @Post('register')
  @ApiOperation({ summary: 'create a new User' })
  async RegisterUser(@Body() registerUserDTO: RegisterUserDto ) 
  {
    const {password,first_name,last_name,email} = registerUserDTO;
    const hashPassword = await this.hashPasswordService.hashPassword(password);
    const defaultRole = Roles.USER;
    return this.usersService.createUser(first_name,last_name,email,defaultRole,hashPassword);
  }
}
