import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductDto 
{
    
  @IsString()
  @ApiProperty({ description: "product naame" ,required: true })
  readonly product_name: string;

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

}