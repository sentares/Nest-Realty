import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TypeService } from 'src/type/type.service';
import { CreatePostDto } from './dto/create-post.dto';
import { IPost } from './interface';
import { PostModel } from './model';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(PostModel.name) private readonly postModel: Model<PostModel>,
    private readonly typeService: TypeService,
  ) {}

  async getAll(): Promise<IPost[]> {
    return await this.postModel.find().populate('type');
  }

  async create(data: CreatePostDto): Promise<IPost> {
    const { title, typeId, price, id_user } = data;
    const type = await this.typeService.getOne(typeId);

    const newPost = new this.postModel({
      title: title || type.title,
      type,
      price,
      id_user,
    });
    return await newPost.save();
  }
}
