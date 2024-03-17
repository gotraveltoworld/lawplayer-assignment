import { Module } from '@nestjs/common';

import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { FetchPostsService } from './fetchPosts.service';
import { UploadQueueService } from './uploadQueue.service';

@Module({
  controllers: [PostsController],
  providers: [PostsService, FetchPostsService, UploadQueueService],
})
export class PostsModule {}
