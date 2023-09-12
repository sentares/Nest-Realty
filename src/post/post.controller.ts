import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guard';
import { CreatePostDto } from './dto';
import { IPost } from './interface';
import { PostService } from './post.service';
import { CurrentUser } from 'src/auth/decorator';
import { IUser } from 'src/user/interface';

@ApiTags('Post')
@Controller('post')
export class PostController {
  constructor(private readonly service: PostService) {}

  @Get()
  async getAll(): Promise<IPost[]> {
    return await this.service.getAll();
  }

  @Post()
  @ApiSecurity('bearer')
  @UseGuards(AuthGuard)
  async create(
    @Body() data: CreatePostDto,
    @CurrentUser() user: IUser,
  ): Promise<IPost> {
    return await this.service.create(data, user);
  }
}
