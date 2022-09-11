import { Body, Controller, Get, Post} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserModel } from '../../domain/models';
import { Auth, Roles,UserReq } from '../../common/decorators';
import { Role } from '../../common/enums/role.enum';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/product.dto';

@ApiTags('Product Module')
@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}


  @Roles(Role.ADMIN)
  @Auth()
  @Post('product/new')
  @ApiOperation({ summary: 'Create One product' })
  createProduct(@UserReq() user: UserModel, @Body() product :CreateProductDto ) 
  {
      try {
          return this.productsService.createProduct(product);
      } catch (error) {
        throw error
      }
  }
}
