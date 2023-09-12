import { Module, forwardRef } from '@nestjs/common';
import { TypeService } from './type.service';
import { TypeController } from './type.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeModel, TypeSchema } from './model';
import { PostModule } from 'src/post/post.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TypeModel.name, schema: TypeSchema }]),
    forwardRef(() => PostModule),
  ],
  providers: [TypeService],
  controllers: [TypeController],
  exports: [TypeService],
})
export class TypeModule {}
