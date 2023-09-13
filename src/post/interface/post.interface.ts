import { ICategory } from 'src/category/interface';
import { IType } from 'src/type/interface';

export interface IPost {
  id: string;
  title: string;
  type: IType;
  category: ICategory;
  price: number;
  images?: string[];

  save?();
}
