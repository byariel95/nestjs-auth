import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas';
import { Model } from 'mongoose';
import { genSalt, hash } from 'bcrypt';
import { UserModel } from '../models';

@Injectable()
export class UsersService 
{

    constructor(@InjectModel(User.name) private userModel : Model<User>){}

  async createUser(createUserDto: any) : Promise<UserModel>
  {
    try 
    {
        const user = new this.userModel(createUserDto);

        //hash the password
        const salt = await genSalt(10);
        user.password = await hash(user.password, salt);

        //save user
        const newUser = await user.save(); 

        const userModel:UserModel  = {
          id: newUser.id,
          first_name: newUser.first_name,
          last_name: newUser.last_name,
          email: newUser.email,
          role: newUser.role,
        };

        return userModel;

    } 
    catch (error) 
    {
      if(error.code === 11000)
      {
        throw new ConflictException('email aready exist');
      }
      throw new BadRequestException('internal server exception please contact your admin')
    }
   
  }
}
