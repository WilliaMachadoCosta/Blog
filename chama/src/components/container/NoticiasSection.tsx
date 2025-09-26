import Link from 'next/link';
import Image from 'next/image';
import { Calendar } from 'lucide-react';
import { IPost } from '@/models/interfaces/post';
import { getPostsByCategory } from '@/services/postServices';

// === Buscar só posts da categoria Notícias (id = 1941) ===
async function getNoticias(): Promise<IPost[]> {
    try {
        const posts = await getPostsByCategory(1941);
        return posts.slice(0, 3); // Apenas 3 artigos
    } catch (error) {
        console.error("Erro ao buscar posts de Notícias:", error);
        return [];
    }
}

// Componente de loading para posts
function NoticiasPostSectionSkeleton() {
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

// Utilitário: formatar data
function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}



export default async function NoticiasSection() {
    const posts = await getNoticias();

    if (posts.length === 0) {
        return null;
    }

    return (
        <section className="mt-6 bg-white rounded-xl shadow p-4">
            {/* Cabeçalho */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">Notícias</h2>
                <Link href="/categoria/noticias" className="text-sm text-purple-600 hover:underline">
                    Ver todas
                </Link>
            </div>

            {/* Lista de posts */}
            <div className="flex flex-col gap-4">
                {posts.map((post) => (
                    <Link key={post.id} href={`/${post.slug}`} className="flex gap-3 group">
                        <div className="flex-1">
                            <h3
                                className="font-semibold text-gray-900 group-hover:text-purple-700 line-clamp-2"
                                dangerouslySetInnerHTML={{ __html: post.title }}
                            />
                            <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                                <span>{post.author}</span>
                                <span>·</span>
                                <span>{formatDate(post.date)}</span>
                            </div>
                        </div>
                        {post.featuredImage && (
                            <div className="relative w-28 h-20 flex-shrink-0 rounded-md overflow-hidden">
                                <Image
                                    src={post.featuredImage}
                                    alt={post.title.replace(/<[^>]*>/g, "")}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}
                    </Link>
                ))}
            </div>

            {/* Botão final */}
            <div className="mt-6">
                <Link
                    href="/categoria/noticias"
                    className="w-full block text-center bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                >
                    VER TODAS AS NOTÍCIAS
                </Link>
            </div>
        </section>
    );
}



// Componente de loading para a seção
export function NoticiasSectionSkeleton() {
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
                    <NoticiasPostSectionSkeleton key={i} />
                ))}
            </div>
        </section>
    );
}
