import { PostType } from '../enum';

export interface IPost {
  id: string;
  title: string;
  type: PostType;
  price: number;
  id_user: string;
}
