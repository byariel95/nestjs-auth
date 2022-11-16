import { ApiProperty } from "@nestjs/swagger";
import { IsEmail,IsNotEmpty, IsString, Length} from "class-validator";

export class LoginDto 
{
  @IsString()
  @IsEmail()
  @ApiProperty({ description: "email", required: true })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6)
  @ApiProperty({ description: "password",required: true })
  readonly password: string;

}