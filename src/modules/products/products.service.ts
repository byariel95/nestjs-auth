import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { fstat, unlinkSync} from 'fs'
import { Product } from '../../domain/schemas';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { CreateProductDto } from './dto/product.dto';

@Injectable()
export class ProductsService 
{
    constructor(
        @InjectModel(Product.name) private productModel : Model<Product>,
        private readonly cloudinaryService : CloudinaryService
    ){}

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

    async uploadImage (file: Express.Multer.File ) 
    {
        try {
            const response = await this.cloudinaryService.uploadImage(file);
            console.log(response);
            return response
        } catch (error) {
            this.logger.warn(`Error in upload image: ${error} `);
            throw new InternalServerErrorException('internal server error');
        }

    }

    async uploadImageToCloudinary (path: string) 
    {
        try {
            const savedImage = await this.cloudinaryService.uploadImageV2(path);
             unlinkSync(path);
            return savedImage;
        } catch (error) {
            this.logger.warn(`Error in uploadImageToCloudinary: ${error} `);
            throw new InternalServerErrorException('internal server error');
        }

    }
}
