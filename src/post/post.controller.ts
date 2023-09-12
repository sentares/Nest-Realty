import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { IPost } from './interface';
import { CreatePostDto } from './dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Post')
@Controller('post')
export class PostController {
  constructor(private readonly service: PostService) {}

  @Get()
  async getAll(): Promise<IPost[]> {
    return await this.service.getAll();
  }

  @Post()
  async create(@Body() data: CreatePostDto): Promise<IPost> {
    return await this.service.create(data);
  }
}
