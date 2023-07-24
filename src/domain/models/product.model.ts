import { Exclude, Expose } from "class-transformer";

@Exclude()
export class ProductModel 
{
    @Expose()
    id: string;
  
    @Expose()
    product_name: string;

    @Expose()
    brand: string;
    
    @Expose()
    description: string ;
  
    @Expose()
    price: number;

    @Expose()
    cost_price: number;

    @Expose()
    quantity: number;

    @Expose()
    bar_code: string ; 

    @Expose()
    detail: string ;

    @Expose()
    images: object[];

}