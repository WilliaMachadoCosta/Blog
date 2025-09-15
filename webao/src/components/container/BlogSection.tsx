import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Calendar, User, ArrowRight, MessageCircle } from 'lucide-react';
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

// Função utilitária para tempo relativo em português
function tempoRelativo(dateString: string) {
    const now = new Date();
    const date = new Date(dateString);
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diff < 60) return 'agora mesmo';
    if (diff < 3600) return `há ${Math.floor(diff / 60)} min`;
    if (diff < 86400) return `há ${Math.floor(diff / 3600)} h`;
    if (diff < 2592000) return `há ${Math.floor(diff / 86400)} d`;
    return date.toLocaleDateString('pt-BR');
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
            {/* Header da seção estilo Instagram */}
            <div className="flex items-center justify-between mb-6 px-2">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#d62976] to-[#fa7e1e] rounded-full flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Últimas Postagens</h2>
                </div>
                <Link
                    href="/blog"
                    className="flex items-center gap-2 text-[#d62976] hover:text-[#c2185b] font-semibold text-sm transition-colors"
                >
                    <span>Ver mais</span>
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>

            {/* Feed estilo Instagram */}
            <div className="flex flex-col gap-6 max-w-lg mx-auto">
                {posts.map((post) => (
                    <article
                        key={post.id}
                        className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                    >
                        {/* Header do post - estilo Instagram */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-[#d62976] to-[#fa7e1e] rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">
                                        {post.author?.[0]?.toUpperCase() || '?'}
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-semibold text-sm text-gray-900">{post.author}</span>
                                    <span className="text-xs text-gray-500">{tempoRelativo(post.date)}</span>
                                </div>
                            </div>
                            <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                                <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                </svg>
                            </button>
                        </div>

                        {/* Imagem do post */}
                        <div className="relative w-full h-64 sm:h-80">
                            <Image
                                src={post.featuredImage}
                                alt={post.title.replace(/<[^>]*>/g, "")}
                                fill
                                className="object-cover"
                                loading="lazy"
                            />
                        </div>

                        {/* Ações do post */}
                        <div className="p-4">
                            <div className="flex items-center gap-4 mb-3">
                                <button className="p-1 hover:scale-110 transition-transform">
                                    <svg className="w-6 h-6 text-gray-600 hover:text-[#d62976] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                </button>
                                <button className="p-1 hover:scale-110 transition-transform">
                                    <MessageCircle className="w-6 h-6 text-gray-600 hover:text-[#d62976] transition-colors" />
                                </button>
                                <button className="p-1 hover:scale-110 transition-transform">
                                    <svg className="w-6 h-6 text-gray-600 hover:text-[#d62976] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                                    </svg>
                                </button>
                            </div>

                            {/* Conteúdo do post */}
                            <Link href={`/${post.slug}`}>
                                <div className="space-y-2">
                                    <h3
                                        className="font-semibold text-gray-900 text-sm line-clamp-2 hover:text-[#d62976] transition-colors"
                                        dangerouslySetInnerHTML={{ __html: post.title }}
                                    />
                                    <p className="text-gray-600 text-sm line-clamp-3">
                                        {post.excerpt.replace(/<[^>]*>/g, "")}
                                    </p>
                                    <span className="text-gray-500 text-xs hover:text-[#d62976] transition-colors cursor-pointer">
                                        Ver mais...
                                    </span>
                                </div>
                            </Link>
                        </div>
                    </article>
                ))}
            </div>

            {/* Botão "Veja mais" para mobile */}
            <div className="mt-6 text-center">
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[#d62976] to-[#fa7e1e] text-white px-6 py-3 rounded-lg font-semibold hover:from-[#c2185b] hover:to-[#f57c00] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
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
