
import { Injectable } from '@nestjs/common';
import {hash } from 'argon2';

@Injectable()
export class HashPasswordService 
{
  async hashPassword(password: string) : Promise<string>
  {
    return await hash(password);
  }

}