import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IUser } from '../interface';

@Schema()
export class UserModel implements IUser {
  @Prop({ alias: '_id' })
  id: string;

  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
