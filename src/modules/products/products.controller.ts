import { 
  Body, 
  Controller, 
  Get, 
  HttpStatus, 
  InternalServerErrorException, 
  Logger, 
  Post, 
  Query, 
  UploadedFile, 
  UseInterceptors
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Auth, Roles,UserReq } from '../../common/decorators';
import { ResponseData } from '../../common/utils/response-data.service';
import { editFileName, imageFileFilter } from '../../common/utils/image-utils';
import { Role } from '../../common/enums/role.enum';
import { ProductsService } from './products.service';
import { CreateProductDto, SearchDto} from './dto/';
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

  @Roles(Role.ADMIN)
  @Auth()
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
  uploadProductImages(@UploadedFile() file: Express.Multer.File) 
  {
    try 
    {   
        const image = this.productsService.uploadImageToCloudinary(file.path)
        //const image = this.productsService.uploadImage(file); 
        return this.responseData.resultResponse(HttpStatus.OK, 'success', image);
    } catch (error) 
    {
        this.logger.debug(`error in upload ${error}`);
        throw new InternalServerErrorException(`Internal Server Exception`)
    }
  }
}
