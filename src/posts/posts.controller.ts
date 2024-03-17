import { Controller, Get, Post, Body } from '@nestjs/common';

import { PostsService } from './posts.service';
import { Post as PostEntity } from './posts.interface';
import { CreatePostRequestBody } from './dto/posts.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  findAll(): PostEntity[] {
    return this.postsService.findAll();
  }

  @Post()
  create(@Body() post: CreatePostRequestBody): PostEntity {
    return this.postsService.create(post);
  }
}
