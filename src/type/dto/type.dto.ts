import { ApiProperty } from '@nestjs/swagger';
import { IType } from '../interface';

export class TypeDto implements IType {
  @ApiProperty({ example: '64c3eeb87984df7cca567311' })
  id: string;

  @ApiProperty({ example: 'SALE' })
  title: string;
}
