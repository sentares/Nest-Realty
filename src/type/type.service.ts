import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TypeModel } from './model';
import { Model } from 'mongoose';
import { IType } from './interface';

@Injectable()
export class TypeService {
  constructor(
    @InjectModel(TypeModel.name)
    private readonly typeModel: Model<TypeModel>,
  ) {}

  async getAll(): Promise<IType[]> {
    return await this.typeModel.find();
  }

  async getOne(id: string): Promise<IType> {
    const type = await this.typeModel.findById(id);
    if (!type) {
      throw new NotFoundException('Type not found');
    }
    return type;
  }
}
