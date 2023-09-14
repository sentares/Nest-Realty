import { ApiProperty } from '@nestjs/swagger';
import { IType } from 'src/type/interface';
import { PostType } from '../enum';
import { IPost } from '../interface';
import { ICategory } from 'src/category/interface';
import { PostCategory } from '../enum/category.enum';

export class PostDto implements IPost {
  @ApiProperty({ example: '64c3eeb87984df7cca567306' })
  id: string;

  @ApiProperty({ example: 'Good House' })
  title: string;

  @ApiProperty({ example: PostType.SALE })
  type: IType;

  @ApiProperty({ example: PostCategory.HOUSE })
  category: ICategory;

  @ApiProperty({ example: 100000 })
  price: number;

  @ApiProperty({ example: 1 })
  bedrooms: number;

  @ApiProperty({ example: 1 })
  bathrooms: number;

  @ApiProperty({ example: '64c3eeb87984df7cca567311' })
  id_user: string;

  @ApiProperty({ example: ['url1', 'url2', 'url3'] })
  images?: string[];
}
