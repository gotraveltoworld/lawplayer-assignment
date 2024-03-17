import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import { PostsService } from './posts.service';
import { UploadQueueService } from './uploadQueue.service';

@Injectable()
export class FetchPostsService {
  private readonly logger = new Logger(FetchPostsService.name);

  constructor(
    private readonly postsService: PostsService,
    private readonly uploadQueueService: UploadQueueService,
  ) {}

  @Cron('*/1 * * * *') // Runs every 1 minute
  async fetchPosts() {
    try {
      // Fetch posts with coverUrl, no imgurCoverUrl, and status IDLE
      const posts = this.postsService.findPostsToUpload();

      // Add fetched posts to upload queue
      for (const post of posts) {
        this.uploadQueueService.addToQueue(post);
        this.logger.debug(`post will be added to queue, ${post.id}`);
      }
      await this.uploadQueueService.processQueue();
      // You can call the upload queue service method here
    } catch (error) {
      this.logger.error(error);
    }
  }
}
