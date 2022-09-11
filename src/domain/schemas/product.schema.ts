import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true, collection: "Products",versionKey: false })
export class Product extends Document
{

    @Prop({type: String})
    product_name: string;

    @Prop({type: String,required:false})
    description: string;

    @Prop({type: Number})
    price: number;

    @Prop({type: Number})
    quantity: number;

    @Prop({ type: [String], required: false })
    images: string[];
  
    @Prop({type: Number, default :true})
    state: boolean;
  
}

export const ProductSchema = SchemaFactory.createForClass(Product);