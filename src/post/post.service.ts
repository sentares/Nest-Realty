import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PostModel } from './model';
import { Model } from 'mongoose';
import { IPost } from './interface';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(PostModel.name) private readonly postModel: Model<PostModel>,
  ) {}

  async getAll(): Promise<IPost[]> {
    return await this.postModel.find();
  }

  async create(data: CreatePostDto): Promise<IPost> {
    const { title, typeId, price, id_user } = data;
    const type = { typeId, title: '' };

    const newPost = new this.postModel({
      title: title || type.title,
      type: typeId,
      price,
      id_user,
    });
    return await newPost.save();
  }
}
