import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TypeModel } from 'src/type/model';
import { IPost } from '../interface';
import mongoose from 'mongoose';

@Schema()
export class PostModel implements IPost {
  @Prop({ alias: '_id' })
  id: string;

  @Prop()
  title: string;

  @Prop()
  price: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'TypeModel' })
  type: TypeModel;

  @Prop()
  id_user: string;
}

export const PostSchema = SchemaFactory.createForClass(PostModel);
