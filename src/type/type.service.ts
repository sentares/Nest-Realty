import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TypeModel } from './model';
import { Model } from 'mongoose';
import { IType } from './interface';
import { TypeDto } from './dto';

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

  // async create(data: TypeDto): Promise<IType> {
  //   const { title } = data;

  //   const exist = await this.typeModel.findOne({ title });
  //   if (exist) {
  //     throw new ConflictException('Such category already exists');
  //   }

  //   const newType = new this.typeModel({ title });
  //   return await newType.save();
  // }
}
