
import { PostModel } from "@/models/posts/post-model";
import { resolve } from "path";
import { readFile } from "fs/promises";
import { PostRepository } from "./post-repository";

const JSON_POSTS_FILE_PATH = resolve('src', 'db', 'seed', 'posts.json');

export class JsonPostRepository implements PostRepository {

  private async readFromDisk(): Promise<PostModel[]> {
    const jsonContent = await readFile(JSON_POSTS_FILE_PATH, 'utf-8')
    const parsedJson = JSON.parse(jsonContent)
    const { posts } = parsedJson;
    return posts;
  }

  async findAll(): Promise<PostModel[]> {
    return this.readFromDisk();
  }

  async findId(postId: string): Promise<PostModel | undefined> {
    const posts = await this.findAll()
    const post = posts.find(p => p.id == postId);
    return post;
  }
}

export const postRepository: PostRepository = new JsonPostRepository();
