import { Exclude, Expose } from "class-transformer";

@Exclude()
export class UserModel 
{
    @Expose()
    id: string;
  
    @Expose()
    first_name: string;
    
    @Expose()
    last_name: string;
  
    @Expose()
    email: string;

    @Exclude()
    role: string;

}