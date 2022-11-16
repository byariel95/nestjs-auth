import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { unlinkSync} from 'fs'
import { Product } from '../../domain/schemas';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { CreateProductDto } from './dto/product.dto';
import { ProductModel } from '../../domain/models';
import { plainToClass } from 'class-transformer';
import { SearchDto } from './dto';

@Injectable()
export class ProductsService 
{
    constructor(
        @InjectModel(Product.name) private productModel : Model<Product>,
        private readonly cloudinaryService : CloudinaryService
    ){}

    private readonly logger = new Logger('Product Service');

    async createProduct (product: CreateProductDto) : Promise<ProductModel>
    {
        try {
            const newProduct = new this.productModel(product);
            const productModel = await newProduct.save();
            return plainToClass(ProductModel, productModel);
        } catch (error) {
            this.logger.warn(`Error in createProduct: ${error} `);
            throw new InternalServerErrorException('internal server error');
        }

    }

    async getProducts (params : SearchDto) : Promise<ProductModel[]> 
    {
        try {
            if(!(Object.keys(params).length > 0))
            {
                const products = await this.productModel.find().where('status').equals(true);
                const allProducts = products.map(product => plainToClass(ProductModel, product)) ;
                return allProducts
            }
            const  { search } = params;
            if (search)
            {
                const products = await this.productModel.find({ 
                    $or : [
                      {product_name: {$regex: search, $options: 'i'}},
                      {brand: {$regex: search, $options: 'i'}}
                 ]}).where('status').equals(true);
                 const allProducts = products.map(product => plainToClass(ProductModel, product)) ;
                 return allProducts
            }
            
            
        } catch (error) {
            this.logger.warn(`Error in createProduct: ${error} `);
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


    async uploadImagesToCloudinary (paths: string[],id: string) : Promise<ProductModel>
    {
        try {
            const images: any = await Promise.allSettled(paths.map(async path => {
               const responseImage =  await this.cloudinaryService.uploadImageV2(path);
               return {
                public_id: responseImage.public_id,
                url: responseImage.url,
               }
            }));

            const pictures = images.map(image => image.value);
            await this.productModel.updateOne({_id:id},{images:pictures}) 

            for (const index in paths){
                unlinkSync(paths[index]);
            }
            const product = await this.productModel.findById(id)
            return plainToClass(ProductModel, product);
        } catch (error) {
            this.logger.warn(`Error in uploadImageToCloudinary: ${error} `);
            throw new InternalServerErrorException('internal server error');
        }

    }

    //TODO DELETE IMAGES FROM CLOUDINARY
    // async removeImagesToCloudinary (images: string[],id: string) 
    // {
    //     try {
            
    //         return product;
    //     } catch (error) {
    //         this.logger.warn(`Error in uploadImageToCloudinary: ${error} `);
    //         throw new InternalServerErrorException('internal server error');
    //     }

    // }
}
