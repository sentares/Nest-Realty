import { ApiProperty } from '@nestjs/swagger';
import { ICategory } from '../interface';

export class CategoryDto implements ICategory {
  @ApiProperty({ example: '64c3eeb87984df7cca567311' })
  id: string;

  @ApiProperty({ example: 'House' })
  title: string;
}
