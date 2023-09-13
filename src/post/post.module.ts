import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { CategoryModule } from 'src/category/category.module';
import { TypeModule } from 'src/type/type.module';
import { PostModel, PostSchema } from './model';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PostModel.name, schema: PostSchema }]),
    MulterModule.register({
      storage: diskStorage({
        destination: (_req, _file, cb) => {
          const uploadPath = `./images`;
          cb(null, uploadPath);
        },
        filename: (_req, file, cb) =>
          cb(
            null,
            `${Date.now() + Math.random()}.${file.originalname
              .split('.')
              .pop()}`,
          ),
      }),
    }),
    forwardRef(() => AuthModule),
    forwardRef(() => TypeModule),
    forwardRef(() => CategoryModule),
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
