import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TypeModel } from 'src/type/model';
import { IPost } from '../interface';
import mongoose from 'mongoose';
import { CategoryModel } from 'src/category/model';
import { UserModel } from 'src/user/model';

@Schema()
export class PostModel implements IPost {
  @Prop({ alias: '_id' })
  id: string;

  @Prop()
  title: string;

  @Prop()
  price: number;

  @Prop()
  bedrooms: number;

  @Prop()
  bathrooms: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'TypeModel' })
  type: TypeModel;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'CategoryModel' })
  category: CategoryModel;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' })
  user: UserModel;

  @Prop([String])
  images: string[];
}

export const PostSchema = SchemaFactory.createForClass(PostModel);
