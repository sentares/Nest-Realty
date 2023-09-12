import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TypeService } from 'src/type/type.service';
import { CreatePostDto } from './dto/create-post.dto';
import { IPost } from './interface';
import { PostModel } from './model';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(PostModel.name) private readonly postModel: Model<PostModel>,
    private readonly typeService: TypeService,
    private readonly categoryService: CategoryService,
  ) {}

  async getAll(): Promise<IPost[]> {
    return await this.postModel.find().populate('type category');
  }

  async create(data: CreatePostDto): Promise<IPost> {
    const { title, typeId, categoryId, price, id_user } = data;
    const type = await this.typeService.getOne(typeId);
    const category = await this.categoryService.getOne(categoryId);

    const newPost = new this.postModel({
      title: title || type.title,
      type,
      price,
      category,
      id_user,
    });
    return await newPost.save();
  }
}
