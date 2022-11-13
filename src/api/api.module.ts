import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';


@Module({
    imports:[
        UsersModule,
        AuthModule,
        ProductsModule,
        CloudinaryModule,
        CategoryModule,
        ApiModule,
    ]
})
export class ApiModule {}
