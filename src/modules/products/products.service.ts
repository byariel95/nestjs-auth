import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../../domain/schemas';
import { CreateProductDto } from './dto/product.dto';

@Injectable()
export class ProductsService 
{
    constructor(@InjectModel(Product.name) private productModel : Model<Product>){}

    private readonly logger = new Logger('Product Service');

    async createProduct (product: CreateProductDto) 
    {
        try {
            const newProduct = new this.productModel(product);
            return await newProduct.save();
        } catch (error) {
            this.logger.warn(`Error in createProduct: ${error} `);
            throw new InternalServerErrorException('internal server error');
        }

    }
}
