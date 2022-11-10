import { Body, Controller, Delete, Get, HttpStatus, Logger, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ChangePasswordDto, CreateUserDto, UpdateUserDto } from './dto/create-user.dto';
import { Auth, Roles } from '../../common/decorators';
import { MongoIdValidatePipe } from '../../common/pipes/object-id-validate.pipe';
import { PasswordService } from '../../common/utils/password.service';
import { UsersService } from './users.service';
import { Role } from '../../common/enums/role.enum';
import { ResponseData } from '../../common/utils/response-data.service';


@ApiTags('User Module ')
@Controller()
export class UsersController 
{
  constructor(
    private readonly usersService: UsersService,
    private readonly PasswordService:PasswordService,
    private readonly responseData: ResponseData,
    ) {}

  private readonly logger = new Logger('User Controller');  

  @Roles(Role.ADMIN)
  @Auth()
  @Get('users')
  @ApiOperation({ summary: 'get all users' })
  getAllUsers() 
  {
    try {
      const response = this.usersService.getAllUsers();
      return this.responseData.resultResponse(HttpStatus.OK, 'success', response);
    } catch (error) {
      this.logger.warn('Error in getAllUsers:',error);
      return this.responseData.resultError(error.status || HttpStatus.INTERNAL_SERVER_ERROR, 'error', undefined)
    }
  }

  @Roles(Role.ADMIN)
  @Auth()
  @Post('user/new')
  @ApiOperation({ summary: 'create a new User' })
  async saveUser(@Body() createUserDTO: CreateUserDto ) 
  {
    try {
      const {password,first_name,last_name,email,role,state} = createUserDTO;
      const hashPassword = await this.PasswordService.hashPassword(password);
      const response = this.usersService.createUser(first_name,last_name,email,role,hashPassword,state);
      return this.responseData.resultResponse(HttpStatus.OK, 'success', response); 
    } catch (error) {
      this.logger.warn('Error in saveUser:',error);
      return this.responseData.resultError(error.status || HttpStatus.INTERNAL_SERVER_ERROR, 'error', undefined)
    }
    
  }

  @Roles(Role.ADMIN,Role.USER)
  @Auth()
  @Get('user/:id')
  @ApiOperation({ summary: 'get one user ' })
  async getUser(@Param('id',MongoIdValidatePipe) id: string ) 
  {
    try {
      const response = await this.usersService.getUser(id);
      return this.responseData.resultResponse(HttpStatus.OK, 'success', response); 
    } catch (error) {
      this.logger.warn('Error in getUser:',error);
      return this.responseData.resultError(error.status || HttpStatus.INTERNAL_SERVER_ERROR, 'error', undefined);
    }
   
  }

  @Roles(Role.ADMIN,Role.USER)
  @Auth()
  @Patch('user/edit/:id')
  @ApiOperation({ summary: 'edit a User' })
  async editUser(@Param('id',MongoIdValidatePipe) id:string,@Body()  updateUserDTO: UpdateUserDto ) 
  {
    try {
      const response = await this.usersService.updateUser(id,updateUserDTO);
      return this.responseData.resultResponse(HttpStatus.OK, 'success', response);
    } catch (error) {
      this.logger.warn('Error in editUser:',error);
      return this.responseData.resultError(error.status || HttpStatus.INTERNAL_SERVER_ERROR, 'error', undefined);
    }

  }

  @Roles(Role.ADMIN,Role.USER)
  @Auth()
  @Patch('user/change-password/:id') 
  @ApiOperation({ summary: 'change user password  ', description: 'password must be at least 8 characters' })
  async changeUserPassword(@Param('id',MongoIdValidatePipe) id:string,@Body()  newPassword: ChangePasswordDto ) 
  {
    try {
      const {password} = newPassword;
      const hashPassword = await this.PasswordService.hashPassword(password);
      const response = await this.usersService.updateUser(id,hashPassword);
      return this.responseData.resultResponse(HttpStatus.OK, 'success', response);
    } catch (error) {
      this.logger.warn('Error in changeUserPassword:',error);
      return this.responseData.resultError(error.status || HttpStatus.INTERNAL_SERVER_ERROR, 'error', undefined);
    }
  }

  
  @Roles(Role.ADMIN)
  @Auth()
  @Delete('user/delete/:id')
  @ApiOperation({ summary: 'remove user' })
  async removeUser(@Param('id',MongoIdValidatePipe) id : string) 
  {
    try {
      const response = await this.usersService.deleteUser(id); 
      return this.responseData.resultResponse(HttpStatus.OK, 'success', response);
    } catch (error) {
      this.logger.warn('Error in removeUser:',error);
      return this.responseData.resultError(error.status || HttpStatus.INTERNAL_SERVER_ERROR, 'error', undefined);
    }
  }
}
