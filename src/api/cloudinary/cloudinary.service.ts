import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import toStream = require('buffer-to-stream');

@Injectable()
export class CloudinaryService 
{
    async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse | UploadApiErrorResponse> 
    {
        return new Promise((resolve, reject) => {
          const upload = cloudinary.uploader.upload_stream((error, result) => {
            if (error) return reject(error);
            resolve(result);
          });
          toStream(file.buffer).pipe(upload);
        });
      }

    async uploadImageV2(file: string) : Promise<UploadApiResponse | UploadApiErrorResponse> 
    {

      try {
        const response = await cloudinary.uploader.upload(file,{
          folder: 'pos',
          use_filename: true,
        }); 
        return response
      } catch (error) {
        throw new InternalServerErrorException('error to upload file to cloudinary');
      }
        
    }

    async removeImage(publicId: string) : Promise<UploadApiResponse | UploadApiErrorResponse> 
    {

      try {
        const response = await cloudinary.uploader.destroy(publicId);
        return response
      } catch (error) {
        throw new InternalServerErrorException('error to upload file to cloudinary');
      }
        
    }

   
}
