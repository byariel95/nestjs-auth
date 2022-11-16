import { 
  Body, 
  Controller, 
  Get, 
  HttpStatus, 
  InternalServerErrorException, 
  Logger, 
  Param, 
  ParseUUIDPipe, 
  Post, 
  Query, 
  UploadedFile, 
  UploadedFiles, 
  UseInterceptors
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Auth, Roles } from '../../common/decorators';
import { ResponseData } from '../../common/utils/response-data.service';
import { editFileName, imageFileFilter } from '../../common/utils/image-utils';
import { Role } from '../../common/enums/role.enum';
import { ProductsService } from './products.service';
import { CreateProductDto, SearchDto} from './dto';
import { diskStorage } from 'multer';

@ApiTags('Product Module')
@Controller()
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly responseData: ResponseData
    ) {}

    private readonly logger = new Logger('Product Controller');  

  

  @Roles(Role.ADMIN,Role.USER)
  @Auth()
  @Post('product/new')
  @ApiOperation({ summary: 'Create One product' })
  async createProduct( @Body() product :CreateProductDto ) 
  {
    try 
    {
        const response = await this.productsService.createProduct(product);
        return this.responseData.resultResponse(HttpStatus.OK, 'success', response);
    } catch (error) 
    {
        this.logger.debug(`error in createProduct ${error}`);
        throw new InternalServerErrorException(`Internal Server Exception`)
    }
  }


  @Roles(Role.ADMIN,Role.USER)
  @Auth()
  @Get('products')
  @ApiOperation({ summary: 'Get All products' })
  async getProducts(@Query() params?: SearchDto ) 
  {
    try 
    {
        const response = await this.productsService.getProducts(params);
        return this.responseData.resultResponse(HttpStatus.OK, 'success', response);
    } catch (error) 
    {
        this.logger.debug(`error in createProduct ${error}`);
        throw new InternalServerErrorException(`Internal Server Exception`)
    }
  }

  //@Roles(Role.ADMIN)
 // @Auth()
  @Post('product/upload/image')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties:{
        file: {
          type: 'string',
          format: 'binary',
        }
      }
    }
  })
  @UseInterceptors(FileInterceptor('file',{
    storage: diskStorage({
      destination : './uploads',
      filename: editFileName
    }),
    fileFilter: imageFileFilter,
    limits : {
      fileSize: 2*1024*1024
    }
  }))
  @ApiOperation({ summary: 'upload images' })
  async uploadProductImage(@UploadedFile() file: Express.Multer.File) 
  {
    try 
    {   
        const image = await this.productsService.uploadImageToCloudinary(file.path)
        return this.responseData.resultResponse(HttpStatus.OK, 'success', image);
    } catch (error) 
    {
        this.logger.debug(`error in upload ${error}`);
        throw new InternalServerErrorException(`Internal Server Exception`)
    }
  }

  @Post('product/:productId/upload/images')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties:{
        files: {
          type: 'array',
          items:{
            type: "string",
            format: 'binary',
          }
        },
      }
    }
  })
  @UseInterceptors(FilesInterceptor('files',6,{
    storage: diskStorage({
      destination : './uploads/images',
      filename: editFileName
    }),
    fileFilter: imageFileFilter,
    limits : {
      fileSize: 2*1024*1024
    }
  }))
  @ApiOperation({ summary: 'upload images of products' })
  async uploadProductsImages(@UploadedFiles() files: Array<Express.Multer.File>, @Param('productId') id : string) 
  {
    try 
    {   
        const paths = files.map(image => image.path);  
        const response =  await this.productsService.uploadImagesToCloudinary(paths,id); 
        return this.responseData.resultResponse(HttpStatus.OK, 'success', response);
    } catch (error) 
    {
        this.logger.debug(`error in upload ${error}`);
        throw new InternalServerErrorException(`Internal Server Exception`)
    }
  }
}
