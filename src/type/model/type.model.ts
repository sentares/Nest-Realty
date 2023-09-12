import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IType } from '../interface';

@Schema()
export class TypeModel implements IType {
  @Prop({ alias: '_id' })
  id: string;

  @Prop()
  title: string;
}

export const TypeSchema = SchemaFactory.createForClass(TypeModel);
