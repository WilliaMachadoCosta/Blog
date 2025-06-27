import { getAllPostsWithCompanies } from "@/services/postServices";
import Link from "next/link";
import Image from "next/image";

export async function PostsListWithCompanies() {
  const posts = await getAllPostsWithCompanies();

  return (
    <div className="space-y-2 mb-8">
      {posts.map((post) => (
        <article
          key={post.id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <Link href={`/post/${post.slug}`}>
            <div className="flex flex-col md:flex-row">
              {/* Imagem do post */}
              <div className="md:w-1/3">
                <Image
                  src={post.featuredImage}
                  alt={post.title.replace(/<[^>]*>/g, "")}
                  width={400}
                  height={300}
                  className="w-full h-48 md:h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Conteúdo do post */}
              <div className="md:w-2/3 p-6">
                <h2
                  className="text-xl font-bold text-gray-900 mb-2 line-clamp-2"
                  dangerouslySetInnerHTML={{ __html: post.title }}
                />

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt.replace(/<[^>]*>/g, "")}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <span>Por {post.author}</span>
                    <time dateTime={post.date}>
                      {new Date(post.date || Date.now()).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </time>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
} 