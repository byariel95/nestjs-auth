import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";
import { Roles } from "../../../common/enums/role.enum";

export class CreateUserDto 
{
    
  @IsString()
  @ApiProperty({ description: "firstname user" ,required: true })
  readonly first_name: string;

  @IsString()
  @ApiProperty({ description: "firstname user" ,required: true })
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

   @IsOptional()
   @IsBoolean()
   @ApiProperty({ description: "status by user" ,required: false,default :true })
   readonly state: boolean;
 

}

export class UpdateUserDto extends PartialType(OmitType(CreateUserDto, ['password']),) {}


export class ChangePasswordDto  {
  @IsString()
  @IsNotEmpty()
  @Length(6)
  @ApiProperty({ description: " new password ",required: true })
  readonly password: string;
}