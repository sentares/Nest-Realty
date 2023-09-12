import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryService } from 'src/category/category.service';
import { TypeService } from 'src/type/type.service';
import { IUser } from 'src/user/interface';
import { CreatePostDto } from './dto/create-post.dto';
import { IPost } from './interface';
import { PostModel } from './model';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(PostModel.name) private readonly postModel: Model<PostModel>,
    private readonly typeService: TypeService,
    private readonly categoryService: CategoryService,
  ) {}

  // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTAwNjU0MmNlOTQ5NGQxMjFhOTgyZGIiLCJpYXQiOjE2OTQ1NDAzMTY4OTEsImV4cCI6MTY5NDU2OTExNjg5MX0.b4xxBbnJx4I3uUJNd5FF25kNkmrOxU7MMUPLw4FvAqA

  async getAll(): Promise<IPost[]> {
    return await this.postModel.find().populate('type').populate('category');
  }

  async getMine(user: IUser): Promise<IPost[]> {
    return await this.postModel
      .find({ user })
      .populate('type')
      .populate('category');
  }

  async create(data: CreatePostDto, user: IUser): Promise<IPost> {
    const { title, typeId, categoryId, price } = data;
    const type = await this.typeService.getOne(typeId);
    const category = await this.categoryService.getOne(categoryId);

    const newPost = new this.postModel({
      title: title || type.title,
      type,
      price,
      category,
      user,
    });
    return await newPost.save();
  }
}
