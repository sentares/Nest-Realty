import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
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

  @Get('/mine')
  @ApiSecurity('bearer')
  @UseGuards(AuthGuard)
  async getMine(@CurrentUser() user: IUser): Promise<IPost[]> {
    return await this.service.getMine(user);
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
