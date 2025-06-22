import { postRepository } from "@/repositories/posts";

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function PostList() {
  await delay(5000); // Espera 5 segundos
  const posts = await postRepository.findAll();
  return (
    <div>
      {posts.map(post => (
        <p key={post.id}>{post.title}</p>
      ))}
    </div>
  );
}
