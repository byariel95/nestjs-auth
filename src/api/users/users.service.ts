import { ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../domain/schemas';
import { Model } from 'mongoose';
import { UserModel } from '../../domain/models';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UsersService 
{

    constructor(@InjectModel(User.name) private userModel : Model<User>){}

    private readonly logger = new Logger('User Service');

  async createUser(first_name:string,last_name:string,email:string,role:string,password:string,state?:boolean) 
  {
    try 
    {
      const user = new this.userModel({first_name,last_name,email,role,password,state});
      await user.save(); 
      return {
        message: 'User Was created Successfully'
      }

    } 
    catch (error) 
    {
      if(error.code === 11000)
      {
        throw new ConflictException('email aready exist');
      }
      this.logger.debug(`error in createUser ${error}`)
      throw new InternalServerErrorException('Internal Server Exception');
    }
   
  }

  async getAllUsers (): Promise<UserModel[]>
  {

    try {
      const users =  await this.userModel.find().where('status').equals(true);
      return  users.map(user => plainToClass(UserModel, user)) ;
      
    } catch (error) {
      this.logger.debug(`error in getAllUsers ${error}`);
        throw new InternalServerErrorException(`Internal Server Exception`)
    }       

  }

  async getUser (id: string): Promise<UserModel>
    {
      try {
        const user =  await this.userModel.findById(id).where('state').equals(true);
        if(!user){
           throw new NotFoundException(`user with ${id} does not exist`);
       }

       return plainToClass(UserModel, user);
        
      } catch (error) {
        this.logger.debug(`error in getUser ${error}`);
        throw new InternalServerErrorException(`Internal Server Exception `);
      }
        
    }


  async getUserByEmail (email: string): Promise<User>
  {
    try {
      const user =await this.userModel.findOne({email}).where('state').equals(true);
      if(!user){
        throw new NotFoundException(`user with email ${email} does not exist`);
      }
      return user
    } catch (error) {
      this.logger.debug(`error in getUserByEmail ${error}`);
      throw new InternalServerErrorException(`Internal Server Exception `)
    }
      
  }

  async updateUser (id: string,RecordDTO: any ): Promise<UserModel>
  {

    try 
    {
      const user =  await this.userModel.findByIdAndUpdate(id,{$set: RecordDTO},{new:true});
      if(!user){
          throw new NotFoundException(`User with ${id} does not exist`);
      }
      return plainToClass(UserModel, user);

    } catch (error) {
      this.logger.debug(`error in updateUser ${error}`);
      throw new InternalServerErrorException(`Internal Server Exception `);
    }
      

  }

  async deleteUser (id: string ): Promise<{ message: string}>
  {

      try 
      {
        const result=  await this.userModel.findByIdAndDelete(id);
        if(!result)
        {
          throw new NotFoundException(`user with id ${id} not found`);
        }
        return { message: `user with id ${id} was deleted successfully`} 
        
      } catch (error) {
        this.logger.debug(`error in deleteUser ${error}`);
        throw new InternalServerErrorException(`Internal Server Exception `);
      }
      

  }

  async changeUserPassword (id: string,password: string ): Promise<{ message: string}>
  {
      try 
      {
        const user =  await this.userModel.findByIdAndUpdate(id,{$set: {password}},{new:true});
        if(!user){
          throw new NotFoundException(`User with ${id} does not exist`);
        }
        return { message: `password was changed successfully`};

      } catch (error) {
        this.logger.debug(`error in changeUserPassword ${error}`);
        throw new InternalServerErrorException(`Internal Server Exception `);
      }
  }
}
