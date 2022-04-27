import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MongoIdValidatePipe } from '../../common/pipes/object-id-validate.pipe';
import { HashPasswordService } from '../../common/utils/hash-password';
import { UsersService } from '../../domain/services';
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';


@ApiTags('Routes for Users')
@Controller()
export class UsersController 
{
  constructor(
    private readonly usersService: UsersService,
    private readonly hashPasswordService: HashPasswordService,
    ) {}


  @Get('users')
  @ApiOperation({ summary: 'get all users' })
  getAllUsers() 
  {
      return this.usersService.getAllUsers();
  }

  @Post('user/new')
  @ApiOperation({ summary: 'create a new User' })
  async saveUser(@Body() createUserDTO: CreateUserDto ) 
  {
    const {password,first_name,last_name,email,role,state} = createUserDTO;
    const hashPassword = await this.hashPasswordService.hashPassword(password);

    return this.usersService.createUser(first_name,last_name,email,role,hashPassword,state);
  }

  @Get('user/:id')
  @ApiOperation({ summary: 'get one user ' })
  async getUser(@Param('id',MongoIdValidatePipe) id: string ) 
  {
    return this.usersService.getUser(id); 
  }

  @Patch('user/edit/:id')
  @ApiOperation({ summary: 'edit a User' })
  async editUser(@Param('id',MongoIdValidatePipe) id:string,@Body()  updateUserDTO: UpdateUserDto ) 
  {
    if(updateUserDTO.hasOwnProperty('password')){
      const {password,...rest} = updateUserDTO;
      const hashPassword = await this.hashPasswordService.hashPassword(password);

      return this.usersService.updateUser(id,{...rest,password:hashPassword});
    }

    return this.usersService.updateUser(id,updateUserDTO);
  }

  @Delete('user/delete/:id')
  @ApiOperation({ summary: 'remove user' })
  async removeUser(@Param('id',MongoIdValidatePipe) id : string) 
  {
    return this.usersService.deleteUser(id) 
  }
}
