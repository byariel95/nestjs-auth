import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Product } from "./product.schema";

@Schema({ timestamps: true, collection: "Categories",versionKey: false })
export class Category extends Document
{

    @Prop({type: String})
    category_name: string;

    @Prop({ type: [{ type: Types.ObjectId, ref: Product.name }],required:false })
    products: Types.Array<Product>;
  
    @Prop({type: Number, default :true})
    state: boolean;
  
}

export const CategorySchema = SchemaFactory.createForClass(Category);