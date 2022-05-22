import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas';
import { Model } from 'mongoose';
import { UserModel } from '../models';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UsersService 
{

    constructor(@InjectModel(User.name) private userModel : Model<User>){}

  async createUser(first_name:string,last_name:string,email:string,role:string,password:string,state?:boolean) : Promise<UserModel>
  {
    try 
    {
        const user = new this.userModel({first_name,last_name,email,role,password,state});
        const newUser = await user.save(); 

        return plainToClass(UserModel, newUser);

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

  async getAllUsers (): Promise<UserModel[]>
  {

        const users =  await this.userModel.find().where('status').equals(true);
        return  users.map(user => plainToClass(UserModel, user)) ;
         

  }

  async getUser (id: string): Promise<UserModel>
    {

        const user =  await this.userModel.findById(id).where('state').equals(true);
        if(!user){
           throw new NotFoundException(`user with ${id} does not exist`);
       }

       return plainToClass(UserModel, user);
    }


  async getUserByEmail (email: string): Promise<User>
  {
      return await this.userModel.findOne({email}).where('state').equals(true);
  }

  async updateUser (id: string,RecordDTO: any ): Promise<UserModel>
  {

      const user =  await this.userModel.findByIdAndUpdate(id,{$set: RecordDTO},{new:true});
     if(!user){
         throw new NotFoundException(`User with ${id} does not exist`);
     }

    return plainToClass(UserModel, user);

  }

  async deleteUser (id: string ): Promise<{ message: string}>
  {

      const result=  await this.userModel.findByIdAndDelete(id);
      if(!result)
      {
           throw new NotFoundException(`user with id ${id} not found`);
      }
      return { message: `user with id ${id} was deleted successfully`} 

  }

  async changeUserPassword (id: string,password: string ): Promise<{ message: string}>
  {

      const user =  await this.userModel.findByIdAndUpdate(id,{$set: {password}},{new:true});
      if(!user){
        throw new NotFoundException(`User with ${id} does not exist`);
      }
      return { message: `password was changed successfully`} 

  }
}
