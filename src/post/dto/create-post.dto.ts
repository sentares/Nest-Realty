import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, Length, Matches } from 'class-validator';
import { IUser } from 'src/user/interface';

export class CreatePostDto {
  @ApiProperty({ example: 'Good House' })
  @Length(10, 200)
  title: string;

  @ApiProperty({ example: '64c3eeb87984df7cca567306' })
  @Length(24, 24)
  @Matches(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/, {
    message: 'Invalid ID',
  })
  typeId: string;

  @ApiProperty({ example: '64c3eeb87984df7cca567306' })
  @Length(24, 24)
  @Matches(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/, {
    message: 'Invalid ID',
  })
  categoryId: string;

  @ApiProperty({ example: 100000 })
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @IsPositive()
  price: number;
}
