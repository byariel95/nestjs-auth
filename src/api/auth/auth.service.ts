import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { plainToClass } from 'class-transformer';
import { IJwtPayload } from './interfaces/jwt-payload.interface';
import { PasswordService } from '../../common/utils/password.service';
import { UserModel } from '../../domain/models';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService 
{
    constructor(
        private readonly userService: UsersService,
        private readonly passwordService: PasswordService,
        private readonly jwtService: JwtService,
       
    ) {}


    async validateUser(loginDTO:any): Promise<{user:UserModel,accessToken:string}>
    {

        try {
            const {email,password} = loginDTO;  
            const user = await this.userService.getUserByEmail(email);
            if(user && (await this.passwordService.validatePassword(user.password,password)))
            {

                const userModel = plainToClass(UserModel, user);
                const payload: IJwtPayload = { sub: user.id,email:user.email,role:user.role };
                const accessToken = this.jwtService.sign(payload);

                return {
                    user:userModel,
                    accessToken,
                }
            }
            
        } catch (error) {
            throw new UnauthorizedException('email o password does not match');
        }
        

        
    }

}
