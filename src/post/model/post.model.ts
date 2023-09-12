import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IPost } from '../interface';
import { PostType } from '../enum';

@Schema()
export class PostModel implements IPost {
  @Prop({ alias: '_id' })
  id: string;

  @Prop()
  title: string;

  @Prop()
  price: number;

  @Prop()
  type: PostType;

  @Prop()
  id_user: string;
}

export const PostSchema = SchemaFactory.createForClass(PostModel);
