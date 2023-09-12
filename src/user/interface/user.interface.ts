import { ObjectId } from 'mongodb';

export interface IUser {
  _id?: ObjectId | string;
  id: string;
  name: string;
  email: string;
  password: string;
}
