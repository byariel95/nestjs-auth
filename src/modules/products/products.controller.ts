import { Controller, Get, HttpCode, HttpStatus, Req} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { UserModel } from '../../domain/models';
import { Auth, Roles,UserReq } from '../../common/decorators';
import { Role } from '../../common/enums/role.enum';
import { ProductsService } from '../../domain/services/';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}


  @Roles(Role.ADMIN,Role.USER)
  @Auth()
  @Get('users')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'get all users' })
  getAllUsers(@UserReq() user: UserModel ) 
  {
      return {
        myUserID: user.id,
        myName: user.first_name,
        myLastName: user.last_name,
        myRole: user.role,
        message: 'success'
      };
  }
}
