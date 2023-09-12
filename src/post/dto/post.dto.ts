import { ApiProperty } from '@nestjs/swagger';
import { IPost } from '../interface';
import { PostType } from '../enum';

export class PostDto implements IPost {
  @ApiProperty({ example: '64c3eeb87984df7cca567306' })
  id: string;

  @ApiProperty({ example: 'Good House' })
  title: string;

  @ApiProperty({ example: PostType.SALE })
  type: PostType;

  @ApiProperty({ example: 100000 })
  price: number;

  @ApiProperty({ example: '64c3eeb87984df7cca567311' })
  id_user: string;
}
