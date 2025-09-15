import { postRepository } from "@/repositories/posts";

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function PostList() {
  await delay(5000); // Espera 5 segundos
  const posts = await postRepository.findAll();
  return (
    <div className="space-y-2 sm:space-y-4">
      {posts.map(post => (
        <p key={post.id} className="text-sm sm:text-base p-2 sm:p-3 bg-white rounded shadow">
          {post.title}
        </p>
      ))}
    </div>
  );
}
