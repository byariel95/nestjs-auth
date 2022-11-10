import { ConfigService } from '@nestjs/config';
import { v2 } from 'cloudinary';
import { CLOUDINARY } from './constant';

export const CloudinaryProvider = {
    provide: CLOUDINARY,
    useFactory: (configService: ConfigService) => {
      return v2.config({
        cloud_name: configService.get('CLOUDINARY_CLOUD'),
        api_key: configService.get('CLOUDINARY_KEY'),
        api_secret: configService.get('CLOUDINARY_SECRET'),
      });
    },
    inject: [ConfigService]
  };