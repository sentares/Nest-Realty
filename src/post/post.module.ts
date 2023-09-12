import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostModel, PostSchema } from './model';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { TypeModule } from 'src/type/type.module';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PostModel.name, schema: PostSchema }]),
    forwardRef(() => TypeModule),
    forwardRef(() => CategoryModule),
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
