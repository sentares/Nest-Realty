import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'aidar2002@mail.ru' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'qwerty123' })
  password: string;
}
