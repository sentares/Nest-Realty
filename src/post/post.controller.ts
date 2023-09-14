import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/auth/decorator';
import { AuthGuard } from 'src/auth/guard';
import { IUser } from 'src/user/interface';
import { CreatePostDto, UpdatePostDto } from './dto';
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

  @Get('mine')
  @ApiSecurity('bearer')
  @UseGuards(AuthGuard)
  async getMine(@CurrentUser() user: IUser): Promise<IPost[]> {
    return await this.service.getMine(user);
  }

  @Get('/:id')
  async getOne(@Param('id') id: string): Promise<IPost> {
    return await this.service.getOne(id);
  }

  @Post()
  @ApiSecurity('bearer')
  @UseGuards(AuthGuard)
  @UseInterceptors(FilesInterceptor('images', 10))
  @ApiConsumes('multipart/form-data')
  async create(
    @Body() data: CreatePostDto,
    @CurrentUser() user: IUser,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    return await this.service.create(data, user, images);
  }

  @Delete('/:id')
  @ApiSecurity('bearer')
  @UseGuards(AuthGuard)
  async deleteOne(@Param('id') id: string, @CurrentUser() user: IUser) {
    return await this.service.deleteOne(id, user);
  }

  @Put('/:id')
  @ApiSecurity('bearer')
  @UseGuards(AuthGuard)
  @UseInterceptors(FilesInterceptor('images', 10))
  @ApiConsumes('multipart/form-data')
  async updatePost(
    @Param('id') id: string,
    @Body() data: UpdatePostDto,
    @CurrentUser() user: IUser,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    return await this.service.updatePost(id, user, data, images);
  }
}
