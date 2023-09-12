import { ApiProperty } from '@nestjs/swagger';
import { IType } from 'src/type/interface';
import { PostType } from '../enum';
import { IPost } from '../interface';

export class PostDto implements IPost {
  @ApiProperty({ example: '64c3eeb87984df7cca567306' })
  id: string;

  @ApiProperty({ example: 'Good House' })
  title: string;

  @ApiProperty({ example: PostType.SALE })
  type: IType;

  @ApiProperty({ example: 100000 })
  price: number;

  @ApiProperty({ example: '64c3eeb87984df7cca567311' })
  id_user: string;
}
