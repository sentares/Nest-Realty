import { IType } from 'src/type/interface';

export interface IPost {
  id: string;
  title: string;
  type: IType;
  price: number;
  id_user: string;
}
