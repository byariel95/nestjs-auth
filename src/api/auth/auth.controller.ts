import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto, RegisterUserDto } from './dto';
import { PasswordService } from '../../common/utils/password.service';
import { Role } from '../../common/enums/role.enum';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { ResponseData } from '../../common/utils/response-data.service';

@ApiTags('Routes for Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly passwordService: PasswordService,
    private readonly usersService: UsersService,
    private readonly responseData: ResponseData,
    ) {}
  
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'register a new User' })
  async RegisterUser(@Body() registerUserDTO: RegisterUserDto ) 
  {
    try {

      const {password,first_name,last_name,email} = registerUserDTO;
      const hashPassword = await this.passwordService.hashPassword(password);
      const defaultRole = Role.USER;
      const response  = await this.usersService.createUser(first_name,last_name,email,defaultRole,hashPassword);
      return this.responseData.resultResponse(HttpStatus.OK, 'success', response);

    } catch (error) {
      return this.responseData.resultError(error.status || HttpStatus.INTERNAL_SERVER_ERROR, 'error', undefined)
    }
    
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'login with email and password' })
  async login(@Body() loginDTO: LoginDto  ) 
  {
     return this.authService.validateUser(loginDTO);
  }

  
}
