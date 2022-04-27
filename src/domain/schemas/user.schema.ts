import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { verify } from "argon2";
import { Document } from "mongoose";

@Schema({ timestamps: true, collection: "Users",versionKey: false })
export class User extends Document
{

    @Prop({type: String})
    first_name: string;

    @Prop({type: String})
    last_name: string;
  
    @Prop({type: String, unique:true})
    email: string;

    @Prop({ type: String })
    role: string;
  
    @Prop({type: String})
    password: string;
  
    @Prop({type: String , required: false})
    facebook_id: string;
  
    @Prop({type: String , required: false})
    google_id: string;
  
    @Prop({type: Number , default :true})
    state: boolean;
  
   

    async validatePassword(password: string) :Promise<Boolean> {
        return await verify(this.password,password);
      }
}

export const UserSchema = SchemaFactory.createForClass(User);