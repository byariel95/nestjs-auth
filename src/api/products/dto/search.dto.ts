import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class SearchDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ description: "search by product" ,required: false })
  readonly search: string;
}