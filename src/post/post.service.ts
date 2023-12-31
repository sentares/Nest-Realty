import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as fs from 'fs';
import { Model } from 'mongoose';
import * as path from 'path';
import { CategoryService } from 'src/category/category.service';
import { TypeService } from 'src/type/type.service';
import { IUser } from 'src/user/interface';
import { IPost } from './interface';
import { PostModel } from './model';
import { UpdatePostDto, CreatePostDto } from './dto';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(PostModel.name) private readonly postModel: Model<PostModel>,
    private readonly typeService: TypeService,
    private readonly categoryService: CategoryService,
  ) {}

  async getAll(): Promise<IPost[]> {
    return await this.postModel.find().populate('type').populate('category');
  }

  async getOne(id: string): Promise<IPost> {
    const post = await this.postModel.findById(id);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return (await post.populate('type')).populate('category');
  }

  async getMine(user: IUser): Promise<IPost[]> {
    return await this.postModel
      .find({ user })
      .populate('type')
      .populate('category');
  }

  async create(
    data: CreatePostDto,
    user: IUser,
    images: Express.Multer.File[],
  ): Promise<IPost> {
    const { title, typeId, categoryId, price, bedrooms, bathrooms } = data;
    const type = await this.typeService.getOne(typeId);
    const category = await this.categoryService.getOne(categoryId);
    const imagePaths = images.map((image) => image.filename);

    const newPost: IPost = new this.postModel({
      title: title || type.title,
      type,
      price: Number(price),
      bedrooms: Number(bedrooms),
      bathrooms: Number(bathrooms),
      category,
      user,
      images: imagePaths,
    });

    if (
      newPost.price < 10 ||
      newPost.bedrooms < 1 ||
      images.length < 2 ||
      newPost.bathrooms < 1
    ) {
      throw new BadRequestException('Invalid post data');
    }

    await newPost.save();

    return newPost;
  }

  async deleteOne(id: string, user: IUser) {
    const post = await this.postModel.findById(id);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (user._id.toString() !== post.user.toString()) {
      throw new UnauthorizedException(
        'You do not have permission to delete this post',
      );
    }

    post.images.forEach((imagePath) => {
      const fullPath = path.join(__dirname, '../../', 'images', imagePath);
      fs.unlinkSync(fullPath);
    });

    await post.deleteOne();

    Logger.log('Post deleted', PostService.name);
    return 'Post deleted successfully';
  }

  async updatePost(
    id: string,
    user: IUser,
    data: UpdatePostDto,
    images: Express.Multer.File[],
  ) {
    const { title, typeId, categoryId, price, bedrooms, bathrooms } = data;
    const type = await this.typeService.getOne(typeId);
    const category = await this.categoryService.getOne(categoryId);

    const post = await this.postModel.findById(id);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (user._id.toString() !== post.user.toString()) {
      throw new UnauthorizedException(
        'You do not have permission to update this post',
      );
    }

    title && (post.title = title || type.title);
    type && (post.type = type);
    category && (post.category = category);
    price && (post.price = Number(price));
    bedrooms && (post.bedrooms = Number(bedrooms));
    bathrooms && (post.bathrooms = Number(bathrooms));

    if (images && images.length > 0) {
      const imagePaths = images.map((image) => image.filename);
      post.images = imagePaths;
    }

    await post.save();

    return post;
  }
}
