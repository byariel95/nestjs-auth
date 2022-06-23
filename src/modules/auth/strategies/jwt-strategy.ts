import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserModel } from "../../../domain/models";
import { UsersService } from "../../../domain/services";
import { IJwtPayload } from "../interfaces/jwt-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        private readonly userService: UsersService, 
        private  config: ConfigService
        ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get<string>('JWT_SECRET'),
        });
    }

    async validate(payload: IJwtPayload): Promise<UserModel> 
    {
        const {  sub: id } = payload;
        const user = await this.userService.getUser(id);
        return user;
    }
}