
import { Injectable } from '@nestjs/common';
import {hash, verify } from 'argon2';

@Injectable()
export class PasswordService 
{
  async hashPassword(password: string) : Promise<string>
  {
    return await hash(password);
  }

  async validatePassword(hash: string,password:string) : Promise<boolean>
  {
    return await verify(hash,password);
  }

}