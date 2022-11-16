import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product, ProductSchema } from '../../domain/schemas';
import { ResponseData } from '../../common/utils/response-data.service';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      }
    ]),
    CloudinaryModule
  ],
  controllers: [ProductsController],
  providers: [ProductsService,ResponseData]
})
export class ProductsModule {}
