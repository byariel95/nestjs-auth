import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas';
import { Model } from 'mongoose';
import { UserModel } from '../models';

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

  async getAllUsers (): Promise<UserModel[]>
  {

        const users =  await this.userModel.find().where('status').equals(true);
        
        return users.map(user => {
          const userModel:UserModel  = {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            role: user.role
          }
          return userModel;

        }) 
         

  }

  async getUser (id: string): Promise<UserModel>
    {

        const user =  await this.userModel.findById(id).where('state').equals(true);
       if(!user){
           throw new NotFoundException(`user with ${id} does not exist`);
       }

        const userModel:UserModel  = {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
      };
  
      return userModel;
    }


  async getUserByEmail (email: string): Promise<User>
  {
      return await this.userModel.findOne({email}).where('state').equals(true);
  }

  async updateUser (id: string,RecordDTO: any ): Promise<UserModel>
  {

      const user =  await this.userModel.findByIdAndUpdate(id,{$set: RecordDTO},{new:true});
     if(!user){
         throw new NotFoundException(`record with ${id} does not exist`);
     }

     const userModel:UserModel  = {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.role,
    };

    return userModel;

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
}
