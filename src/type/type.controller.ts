import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TypeService } from './type.service';
import { IType } from './interface';
import { TypeDto } from './dto';

@ApiTags('Type')
@Controller('type')
export class TypeController {
  constructor(private readonly service: TypeService) {}

  @Get()
  async getAll(): Promise<IType[]> {
    return await this.service.getAll();
  }

  @Get('/:id')
  async getOne(@Param('id') id: string): Promise<IType> {
    return await this.service.getOne(id);
  }

  // @Post()
  // async create(@Body() data: TypeDto): Promise<IType> {
  //   return await this.service.create(data);
  // }
}
