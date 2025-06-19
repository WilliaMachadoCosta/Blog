import { PostModel } from "@/models/posts/post-model";

export interface PostRepository {
  findAll(): Promise<PostModel[]>
}
//entender o que seria esta estrutura