import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas';
import { Model } from 'mongoose';
import { genSalt, hash } from 'bcrypt';

@Injectable()
export class UsersService 
{

    constructor(@InjectModel(User.name) private userModel : Model<User>){}

    async createUser(createUserDto: any) : Promise<User>
  {
    try {
      const user = new this.userModel(createUserDto);
      const salt = await genSalt(10);
      user.password = await hash(user.password, salt);
      const newUser = await user.save(); 
      delete newUser.password;
      return newUser;

    } catch (error) {
      if(error.code === 11000){
        throw new ConflictException('email aready exist');
      }
      throw new BadRequestException('internal server exception please contact your admin')
    }
   
  }
}
