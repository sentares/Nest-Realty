import { Module } from '@nestjs/common';
import { TypeService } from './type.service';
import { TypeController } from './type.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeModel, TypeSchema } from './model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TypeModel.name, schema: TypeSchema }]),
  ],
  providers: [TypeService],
  controllers: [TypeController],
})
export class TypeModule {}
