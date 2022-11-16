import { ApiProperty } from "@nestjs/swagger";
import { IsEmail,IsNotEmpty, IsString, Length } from "class-validator";

export class RegisterUserDto 
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

}
