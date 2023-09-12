import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, Length } from 'class-validator';
import { PostType } from '../enum';

export class CreatePostDto {
  @ApiProperty({ example: 'Good House' })
  @Length(10, 200)
  title: string;

  @ApiProperty({ example: PostType.SALE })
  typeId: PostType;

  @ApiProperty({ example: 100000 })
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @IsPositive()
  price: number;

  @ApiProperty({ example: '64c3eeb87984df7cca567311' })
  id_user: string;
}
