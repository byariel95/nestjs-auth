import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsString, Length } from "class-validator";
import { Roles } from "../enums/role.enum";

export class CreateUserDto 
{
    
  @IsString()
  @ApiProperty({ description: "firstname user" ,required: false })
  readonly first_name: string;

  @IsString()
  @ApiProperty({ description: "firstname user" ,required: false })
  readonly last_name: string;

  @IsString()
  @IsEmail()
  @ApiProperty({ description: "the user' email", required: true })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6)
  @ApiProperty({ description: "the user' password",required: true })
  readonly password: string;

  @ApiProperty({ enum: ["User","Admin"], required:true})
  @IsEnum(Roles, {
      each: true,
      message: `must be a valid role value`,
    })
   readonly role: string;

}

export class UpdateUserDto extends PartialType(CreateUserDto) {}