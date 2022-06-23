import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ProductsService } from '../../domain/services/';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}


  @Get('users')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'get all users' })
  getAllUsers() 
  {
      return {
        message: 'success'
      };
  }
}
