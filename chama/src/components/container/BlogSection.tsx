import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Calendar, User, ArrowRight } from 'lucide-react';
import { IPost } from '@/models/interfaces/post';
import { getAllPosts, getPostsByCategorySlug } from '@/services/postServices';
import { getAllCategories } from '@/services/categoryServices';

// Função para buscar posts recentes das categorias definidas
async function getRecentBlogPosts(): Promise<IPost[]> {
    try {
        const categories = getAllCategories();
        
        // Buscar posts de cada categoria usando slug
        const postsPromises = categories.map(category => 
            getPostsByCategorySlug(category.slug)
        );
        
        const allCategoryPosts = await Promise.all(postsPromises);
        
        // Combinar todos os posts e remover duplicatas
        const allPosts = allCategoryPosts.flat();
        const uniquePosts = allPosts.filter((post, index, self) => 
            index === self.findIndex(p => p.id === post.id)
        );
        
        // Retornar apenas os 3 mais recentes
        return uniquePosts
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 3);
    } catch (error) {
        console.error("Erro ao buscar posts do blog:", error);
        // Fallback: buscar todos os posts se houver erro
        try {
            const allPosts = await getAllPosts();
            return allPosts
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .slice(0, 3);
        } catch (fallbackError) {
            console.error("Erro no fallback:", fallbackError);
            return [];
        }
    }
}

// Componente de loading para posts
function BlogPostSkeleton() {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
            <div className="h-32 bg-gray-300"></div>
            <div className="p-4">
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3 mb-3"></div>
                <div className="flex gap-4">
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                    <div className="h-3 bg-gray-200 rounded w-20"></div>
                </div>
            </div>
        </div>
    );
}

// Componente principal da seção de blog
export default async function BlogSection() {
    const posts = await getRecentBlogPosts();

    if (posts.length === 0) {
        return null; // Não mostra a seção se não há posts
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    return (
        <section className="mt-8 mb-6">
            {/* Header da seção */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <BookOpen className="w-6 h-6 text-green-600" />
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                        Blog
                    </h2>
                </div>
                <Link 
                    href="/blog"
                    className="flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold text-sm sm:text-base transition-colors"
                >
                    <span>Veja mais</span>
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>

            {/* Grid de posts */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {posts.map((post) => (
                    <article
                        key={post.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                    >
                        <Link href={`/post/${post.slug}`}>
                            {/* Imagem do post */}
                            <div className="relative h-32 sm:h-40">
                                <Image
                                    src={post.featuredImage}
                                    alt={post.title.replace(/<[^>]*>/g, "")}
                                    fill
                                    className="object-cover"
                                    loading="lazy"
                                />
                            </div>

                            {/* Conteúdo do post */}
                            <div className="p-4">
                                <h3
                                    className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm sm:text-base"
                                    dangerouslySetInnerHTML={{ __html: post.title }}
                                />

                                <p className="text-gray-600 mb-3 line-clamp-2 text-xs sm:text-sm">
                                    {post.excerpt.replace(/<[^>]*>/g, "")}
                                </p>

                                {/* Meta informações */}
                                <div className="flex items-center justify-between text-xs text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <User className="w-3 h-3" />
                                        <span className="truncate">{post.author}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        <time dateTime={post.date}>
                                            {formatDate(post.date)}
                                        </time>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </article>
                ))}
            </div>

            {/* Botão "Veja mais" para mobile */}
            <div className="mt-6 text-center md:hidden">
                <Link 
                    href="/blog"
                    className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                    <BookOpen className="w-4 h-4" />
                    Ver todos os posts
                </Link>
            </div>
        </section>
    );
}

// Componente de loading para a seção
export function BlogSectionSkeleton() {
    return (
        <section className="mt-8 mb-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-gray-300 rounded"></div>
                    <div className="h-6 bg-gray-300 rounded w-16"></div>
                </div>
                <div className="h-4 bg-gray-300 rounded w-20"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(3)].map((_, i) => (
                    <BlogPostSkeleton key={i} />
                ))}
            </div>
        </section>
    );
}
