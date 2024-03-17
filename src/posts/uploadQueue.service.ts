import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

import { IMGUR_API, IMGUR_CLIENT_ID, IMG_STATUS } from './constants';
import { PostsService } from './posts.service';

@Injectable()
export class UploadQueueService {
  private readonly logger = new Logger(UploadQueueService.name);
  private queue: any[] = [];

  constructor(private readonly postsService: PostsService) {}

  addToQueue(post: any) {
    this.queue.push(post);
  }

  async processQueue() {
    for (const post of this.queue) {
      // Set status to UPLOADING
      this.postsService.updateStatus(post.id, IMG_STATUS.UPLOADING);

      try {
        // Upload image to imgur.com
        const response = await axios.post(
          IMGUR_API,
          {
            image: post.coverUrl,
          },
          {
            headers: {
              Authorization: `Client-ID ${IMGUR_CLIENT_ID}`,
            },
          },
        );

        // Set imgurCoverUrl to the imgur.com URL and status to DONE
        this.postsService.updatePost(post.id, {
          imgurCoverUrl: response.data.data.link,
          status: IMG_STATUS.DONE,
        });
      } catch (error) {
        this.logger.error(error);
        // Set status to ERROR
        this.postsService.updateStatus(post.id, IMG_STATUS.ERROR);
      }
    }
  }
}
