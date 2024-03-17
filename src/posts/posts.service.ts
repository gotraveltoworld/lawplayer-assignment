import * as path from 'path';
import * as fs from 'fs';

import { Injectable, Logger } from '@nestjs/common';
import * as jsonfile from 'jsonfile';

import { IMG_STATUS } from './constants';
import { Post, Status } from './posts.interface';

const writeJson = (path, data) => {
  jsonfile.writeFileSync(
    path,
    {
      data,
      timestamp: new Date().toISOString(),
    },
    { spaces: 2 },
  );
};

@Injectable()
export class PostsService {
  private readonly logger = new Logger(PostsService.name);
  private readonly filePath: string;

  constructor() {
    this.filePath = path.resolve(__dirname, 'posts.json');
  }

  generateJsonFileIfNotExists(): void {
    if (!fs.existsSync(this.filePath)) {
      writeJson(this.filePath, []);
      this.logger.debug(`Generated JSON file: ${this.filePath}`);
    } else {
      this.logger.debug(`JSON file already exists: ${this.filePath}`);
    }
  }

  findAll(): Post[] {
    this.generateJsonFileIfNotExists();
    return jsonfile.readFileSync(this.filePath)?.data;
  }

  // Fetch posts with coverUrl, no imgurCoverUrl, and status = IDLE
  findPostsToUpload(): Post[] {
    this.generateJsonFileIfNotExists();
    const posts = jsonfile.readFileSync(this.filePath)?.data;
    return posts
      .filter((post) => post.status === IMG_STATUS.IDLE)
      .map((post) => ({
        id: post.id,
        coverUrl: post.coverUrl,
        status: post.status,
      }));
  }

  updateStatus(postId: number, status: Status): Post {
    this.generateJsonFileIfNotExists();
    let updatedPost: Post;
    const posts: Post[] = jsonfile.readFileSync(this.filePath)?.data;
    for (const post of posts) {
      if (post.id === postId) {
        post.status = status;
        updatedPost = post;
      }
    }
    writeJson(this.filePath, posts);
    return updatedPost;
  }

  updatePost(postId: number, updatedPost: Partial<Post>): Partial<Post> {
    this.generateJsonFileIfNotExists();
    const posts: Post[] = jsonfile.readFileSync(this.filePath)?.data;
    for (const post of posts) {
      if (post.id === postId) {
        post.imgurCoverUrl = updatedPost.imgurCoverUrl || post.imgurCoverUrl;
        post.coverUrl = updatedPost.coverUrl || post.coverUrl;
        post.status = updatedPost.status || post.status;
      }
    }
    writeJson(this.filePath, posts);
    return updatedPost;
  }

  create(post: Partial<Post>): Post {
    this.generateJsonFileIfNotExists();
    const posts: Post[] = jsonfile.readFileSync(this.filePath)?.data;
    const newPost: Post = {
      id: posts.length + 1,
      coverUrl: post.coverUrl,
      status: IMG_STATUS.IDLE,
    };
    posts.push(newPost);
    writeJson(this.filePath, posts);
    return newPost;
  }
}
