import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/auth/decorator';
import { AuthGuard } from 'src/auth/guard';
import { IUser } from 'src/user/interface';
import { CreatePostDto } from './dto';
import { IPost } from './interface';
import { PostService } from './post.service';

@ApiTags('Post')
@Controller('post')
export class PostController {
  constructor(private readonly service: PostService) {}

  @Get()
  async getAll(): Promise<IPost[]> {
    return await this.service.getAll();
  }

  @Get('/:id')
  async getOne(@Param('id') id: string): Promise<IPost> {
    return await this.service.getOne(id);
  }

  @Get('/mine')
  @ApiSecurity('bearer')
  @UseGuards(AuthGuard)
  async getMine(@CurrentUser() user: IUser): Promise<IPost[]> {
    return await this.service.getMine(user);
  }

  @Post()
  @ApiSecurity('bearer')
  @UseGuards(AuthGuard)
  @UseInterceptors(FilesInterceptor('images', 10))
  async create(
    @Body() data: CreatePostDto,
    @CurrentUser() user: IUser,
  ): Promise<IPost> {
    console.log(data, 'from controller');

    return await this.service.create(data, user);
  }

  // @Post('post')
  // @UseInterceptors(FilesInterceptor('images', 10))
  // async uploadFiles(@UploadedFiles() images: Express.Multer.File[]) {
  //   // images - это массив файлов
  //   console.log(images);

  //   // return await this.service.postImages(images);
  // }
}
