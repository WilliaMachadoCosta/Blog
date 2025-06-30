import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Calendar, User, ArrowRight, MessageCircle } from 'lucide-react';
import { IPost } from '@/models/interfaces/post';
import { getAllPosts, getPostsByCategorySlug } from '@/services/postServices';
import { getAllCategories } from '@/services/categoryServices';
import GoogleAdSense from '@/components/banner/GoogleAdSense';
import { getAdConfig, shouldShowAds } from '@/config/ads';

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

// Componente principal da seção de blog
export default async function BlogSection() {
    const posts = await getRecentBlogPosts();
    const showAds = shouldShowAds();

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
        <section
            className="mt-8 mb-6 bg-[#f5f3ef] rounded-xl shadow-lg p-4"
        >
            {/* Header da seção */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <BookOpen className="w-6 h-6 text-green-600" />
                    <h2 className="text-2xl font-bold text-gray-900">Blog</h2>
                </div>
                <Link 
                    href="/blog"
                    className="flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold text-base transition-colors"
                >
                    <span>Veja mais</span>
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>

            {/* Anúncio do Google AdSense */}
            {showAds && (
                <div className="mb-6">
                    <GoogleAdSense 
                        {...getAdConfig('HORIZONTAL_MAIN')}
                        className="w-full"
                    />
                </div>
            )}

            {/* Grid de posts */}
            <div className="flex flex-col gap-4">
                {posts.map((post) => (
                    <article
                        key={post.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col md:flex-row items-stretch"
                    >
                        {/* Conteúdo do post */}
                        <Link href={`/${post.slug}`} className="flex-1 flex flex-col md:flex-row">
                            <div className="flex-1 p-4 flex flex-col justify-between">
                                <h3
                                    className="font-bold text-gray-900 mb-2 text-lg md:text-xl line-clamp-2"
                                    dangerouslySetInnerHTML={{ __html: post.title }}
                                />
                                <p className="text-gray-600 mb-3 line-clamp-2 text-sm md:text-base">
                                    {post.excerpt.replace(/<[^>]*>/g, "")}
                                </p>
                                {/* Meta informações */}
                                <div className="flex items-center justify-between text-xs text-gray-500 mt-auto">
                                    <div className="flex items-center gap-2">
                                        {/* Avatar do autor (inicial) */}
                                        <span className="w-7 h-7 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-sm">
                                            {post.author?.[0]?.toUpperCase() || '?'}
                                        </span>
                                        <span className="truncate">{post.author}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        <span>{tempoRelativo(post.date)}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MessageCircle className="w-4 h-4" />
                                        <span>1</span>
                                    </div>
                                </div>
                            </div>
                            {/* Imagem do post */}
                            <div className="relative w-full md:w-48 h-32 md:h-auto md:min-h-full">
                                <Image
                                    src={post.featuredImage}
                                    alt={post.title.replace(/<[^>]*>/g, "")}
                                    fill
                                    className="object-cover"
                                    loading="lazy"
                                />
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
