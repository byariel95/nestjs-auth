import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PasswordService } from '../../common/utils/password.service';
import { UserModel } from '../models';
import { UsersService } from './users.service';

@Injectable()
export class AuthService 
{
    constructor(
        private readonly userService: UsersService,
        private readonly passwordService: PasswordService,
    ) {}


    async validateUser(loginDTO:any): Promise<UserModel>
    {

        const {email,password} = loginDTO;
        
        const user = await this.userService.getUserByEmail(email);
        if(user && (await this.passwordService.validatePassword(user.password,password)))
        {

            const userModel:UserModel  = {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                role: user.role,
            };

            return userModel;
        }

        throw new UnauthorizedException('Please check your credentials');
    }

}
