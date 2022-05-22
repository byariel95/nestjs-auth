import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ChangePasswordDto, CreateUserDto, UpdateUserDto } from './dto/create-user.dto';
import { Auth } from '../../common/decorators';
import { MongoIdValidatePipe } from '../../common/pipes/object-id-validate.pipe';
import { PasswordService } from '../../common/utils/password.service';
import { UsersService } from '../../domain/services';


@ApiTags('Routes for Users')
@Auth()
@Controller()
export class UsersController 
{
  constructor(
    private readonly usersService: UsersService,
    private readonly PasswordService:PasswordService,
    ) {}


  @Get('users')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'get all users' })
  getAllUsers() 
  {
      return this.usersService.getAllUsers();
  }

  @Post('user/new')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'create a new User' })
  async saveUser(@Body() createUserDTO: CreateUserDto ) 
  {
    const {password,first_name,last_name,email,role,state} = createUserDTO;
    const hashPassword = await this.PasswordService.hashPassword(password);

    return this.usersService.createUser(first_name,last_name,email,role,hashPassword,state);
  }

  @Get('user/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'get one user ' })
  async getUser(@Param('id',MongoIdValidatePipe) id: string ) 
  {
    return this.usersService.getUser(id); 
  }

  @Patch('user/edit/:id')
  @HttpCode(HttpStatus.OK)  
  @ApiOperation({ summary: 'edit a User' })
  async editUser(@Param('id',MongoIdValidatePipe) id:string,@Body()  updateUserDTO: UpdateUserDto ) 
  {
    /* if(updateUserDTO.hasOwnProperty('password')){
      const {password,...rest} = updateUserDTO;
      const hashPassword = await this.PasswordService.hashPassword(password);
      return this.usersService.updateUser(id,{...rest,password:hashPassword});
    }*/

    return this.usersService.updateUser(id,updateUserDTO);
  }

  @Patch('user/change-password/:id')
  @HttpCode(HttpStatus.OK)  
  @ApiOperation({ summary: 'change user password  ', description: 'password must be at least 8 characters' })
  async changeUserPassword(@Param('id',MongoIdValidatePipe) id:string,@Body()  newPassword: ChangePasswordDto ) 
  {
    const {password} = newPassword;
    const hashPassword = await this.PasswordService.hashPassword(password);
    return this.usersService.updateUser(id,hashPassword);
  }

  

  @Delete('user/delete/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'remove user' })
  async removeUser(@Param('id',MongoIdValidatePipe) id : string) 
  {
    return this.usersService.deleteUser(id) 
  }
}
