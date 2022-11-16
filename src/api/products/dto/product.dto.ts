import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductDto 
{
    
  @IsString()
  @ApiProperty({ description: "product naame" ,required: true })
  readonly product_name: string;

  @IsString()
  @ApiProperty({ description: "product naame" ,required: false })
  readonly brand: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: "description of product " ,required: false })
  readonly description: string;
  
  @IsNumber()
  @ApiProperty({ description: "price for product", required: true })
  readonly price: number;

  @IsNumber()
  @ApiProperty({ description: "units of product", required: true })
  readonly quantity: number;

  @IsNumber()
  @ApiProperty({ description: "cost price", required: true })
  readonly cost_price: number;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: "bar code to generate automatic" ,required: false })  
  readonly bar_code: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: "extra detail by product" ,required: false })
  readonly detail: string;

}