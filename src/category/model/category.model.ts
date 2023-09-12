import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ICategory } from '../interface';

@Schema()
export class CategoryModel implements ICategory {
  @Prop({ alias: '_id' })
  id: string;

  @Prop()
  title: string;
}

export const CategorySchema = SchemaFactory.createForClass(CategoryModel);
