import Link from "next/link";
import Image from "next/image";
import { IPost } from "@/models/interfaces/post";
import { getAllPosts } from "@/services/postServices";

// Buscar posts recentes
async function getRecentBlogPosts(): Promise<IPost[]> {
    const allPosts = await getAllPosts();
    return allPosts
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 3);
}

export default async function HeroHeader() {
    const posts = await getRecentBlogPosts();
    if (posts.length === 0) return null;

    const formatDate = (dateString: string) =>
        new Date(dateString).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });

    return (
        <section className="mt-8 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Post principal (maior) */}
                {posts[0] && (
                    <Link
                        href={`/${posts[0].slug}`}
                        className="block rounded-xl overflow-hidden shadow-md hover:shadow-xl transition md:col-span-2"
                    >
                        {/* Imagem com fallback */}
                        <div className="relative w-full h-56 md:h-96 bg-gray-200">
                            {posts[0].featuredImage ? (
                                <Image
                                    src={posts[0].featuredImage}
                                    alt={posts[0].title.replace(/<[^>]*>/g, "")}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="flex items-center justify-center w-full h-full text-gray-500">
                                    Sem imagem
                                </div>
                            )}
                        </div>

                        <div className="p-4">
                            {posts[0].categoryNames?.map((cat, idx) => {
                                console.log("🏷️ Categoria renderizada:", {
                                    name: cat,
                                    slug: posts[0].categorySlugs[idx],
                                    post: posts[0].slug,
                                });

                                return (
                                    <Link
                                        key={posts[0].categorySlugs[idx]}
                                        href={`/categoria/${posts[0].categorySlugs[idx]}`}
                                        className="inline-block text-xs font-semibold text-white bg-red-600 px-2 py-1 rounded-md mb-2 hover:bg-red-700 transition"
                                    >
                                        {cat}
                                    </Link>
                                );
                            })}

                            <h3
                                className="text-xl md:text-2xl font-bold text-gray-900 mb-2 line-clamp-2"
                                dangerouslySetInnerHTML={{ __html: posts[0].title }}
                            />
                            <div className="text-sm text-gray-500">
                                {posts[0].author} — {formatDate(posts[0].date)}
                            </div>
                        </div>
                    </Link>
                )}

                {/* Coluna da direita com 2 posts menores */}
                <div className="flex flex-col gap-4">
                    {posts.slice(1).map((post) => (
                        <Link
                            key={post.id}
                            href={`/${post.slug}`}
                            className="flex gap-4 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition"
                        >
                            <div className="flex-1 p-4">
                                {post.categoryNames?.map((cat, idx) => (
                                    <Link
                                        key={post.categorySlugs[idx]}
                                        href={`/categoria/${post.categorySlugs[idx]}`}
                                        className="inline-block text-xs font-semibold text-white bg-red-600 px-2 py-1 rounded-md mb-2 hover:bg-red-700 transition"
                                    >
                                        {cat}
                                    </Link>
                                ))}

                                <h3
                                    className="text-lg font-bold text-gray-900 mb-1 line-clamp-2"
                                    dangerouslySetInnerHTML={{ __html: post.title }}
                                />
                                <div className="text-sm text-gray-500">
                                    {post.author} — {formatDate(post.date)}
                                </div>
                            </div>

                            {/* Imagem com fallback */}
                            <div className="relative w-32 h-28 shrink-0 bg-gray-200">
                                {post.featuredImage ? (
                                    <Image
                                        src={post.featuredImage}
                                        alt={post.title.replace(/<[^>]*>/g, "")}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center w-full h-full text-gray-500 text-xs">
                                        Sem imagem
                                    </div>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
