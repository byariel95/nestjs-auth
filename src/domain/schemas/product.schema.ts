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

    @Prop({type: Number})
    cost_price: number;

    @Prop({type: String})
    bar_code: string;

    @Prop({type: String})
    brand: string;

    @Prop({type: String})
    detail: string;

    @Prop({ type: [Object], required: false })
    images: object[];
  
    @Prop({type: Number, default :true})
    state: boolean;
  
}

export const ProductSchema = SchemaFactory.createForClass(Product);