import { getPostsPaginatedByCategory } from "@/services/postServices";
import { getAllCategoryBySlug } from "@/services/categoryServices";
import Link from "next/link";
import Image from "next/image";

interface CategoryPageProps {
    slug: string;
    page?: string;
}

export default async function CategoryPage({ slug, page = "1" }: CategoryPageProps) {
    const currentPage = Number(page);

    const category = await getAllCategoryBySlug(slug);
    if (!category) return <div>Categoria não encontrada</div>;

    const { posts, totalPages } = await getPostsPaginatedByCategory(
        category.id,
        currentPage,
        10
    );

    return (
        <main className="min-h-screen bg-[#f5f3ef] py-6 px-4">
            <h1 className="text-2xl font-bold mb-6">
                Artigos da categoria: {category.name}
            </h1>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                    <article
                        key={post.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
                    >
                        {post.featuredImage && (
                            <Image
                                src={post.featuredImage}
                                alt={post.title}
                                width={600}
                                height={400}
                                className="w-full h-48 object-cover"
                            />
                        )}
                        <div className="p-4">
                            <h2
                                className="text-lg font-semibold mb-2"
                                dangerouslySetInnerHTML={{ __html: post.title }}
                            />
                            <p
                                className="text-sm text-gray-600 line-clamp-3"
                                dangerouslySetInnerHTML={{ __html: post.excerpt }}
                            />
                            <Link
                                href={`/${post.slug}`}
                                className="inline-block mt-3 text-green-600 font-medium hover:underline"
                            >
                                Leia mais →
                            </Link>
                        </div>
                    </article>
                ))}
            </div>

            <div className="flex justify-center mt-8 space-x-4">
                {currentPage > 1 && (
                    <Link
                        href={`/categoria/${slug}/page/${currentPage - 1}`}
                        className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                    >
                        ← Anterior
                    </Link>
                )}

                <span className="px-4 py-2 bg-green-100 rounded-lg">
                    Página {currentPage} de {totalPages}
                </span>

                {currentPage < totalPages && (
                    <Link
                        href={`/categoria/${slug}/page/${currentPage + 1}`}
                        className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                    >
                        Próxima →
                    </Link>
                )}
            </div>
        </main>
    );
}
