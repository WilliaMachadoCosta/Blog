'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Play, Youtube, Clock, Eye } from 'lucide-react';

interface YouTubeVideo {
    id: string;
    title: string;
    description: string;
    thumbnail: {
        url: string;
        width: number;
        height: number;
    };
    publishedAt: string;
    duration: string;
    viewCount: string;
    channelTitle: string;
    type: 'video' | 'short';
    url: string;
}

interface YouTubeConfigurableProps {
    maxResults?: number;
}

// Função para formatar números de visualizações
function formatViewCount(viewCount: string): string {
    const count = parseInt(viewCount);
    if (count >= 1000000) {
        return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
        return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
}

// Função para formatar duração do vídeo
function formatDuration(duration: string): string {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return '0:00';

    const hours = parseInt(match[1] || '0');
    const minutes = parseInt(match[2] || '0');
    const seconds = parseInt(match[3] || '0');

    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Função para calcular tempo relativo
function getTimeAgo(dateString: string): string {
    const now = new Date();
    const date = new Date(dateString);
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diff < 60) return 'agora mesmo';
    if (diff < 3600) return `há ${Math.floor(diff / 60)} min`;
    if (diff < 86400) return `há ${Math.floor(diff / 3600)} h`;
    if (diff < 2592000) return `há ${Math.floor(diff / 86400)} d`;
    if (diff < 31536000) return `há ${Math.floor(diff / 2592000)} mês`;
    return `há ${Math.floor(diff / 31536000)} ano`;
}

export default function YouTubeConfigurable({
    maxResults = 10
}: YouTubeConfigurableProps) {
    console.log("🎥 YouTubeConfigurable component rendering with maxResults:", maxResults);
    const [videos, setVideos] = useState<YouTubeVideo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchYouTubeVideos() {
            try {
                console.log("🔄 Iniciando busca de vídeos configuráveis do YouTube...");
                setLoading(true);
                setError(null);

                // Usar a nova API que busca vídeos específicos da lista configurável
                const url = `/api/youtube/videos/configurable?maxResults=${maxResults}`;
                console.log("📡 Fazendo requisição para:", url);

                const response = await fetch(url);
                console.log("📡 Resposta recebida:", response.status, response.ok);

                if (!response.ok) {
                    throw new Error('Erro ao buscar vídeos do YouTube');
                }

                const data = await response.json();
                console.log("📊 Dados recebidos:", data);
                setVideos(data.items || []);
            } catch (err) {
                console.error('❌ Erro ao buscar vídeos:', err);
                setError('Erro ao carregar vídeos do YouTube');
                // Dados mockados como fallback
                console.log("🔄 Usando dados mockados como fallback");

            } finally {
                setLoading(false);
            }
        }

        fetchYouTubeVideos();
    }, [maxResults]);

    console.log("🎬 Estado atual:", { loading, error, videosCount: videos.length });

    if (loading) {
        return (
            <section className="mt-8 mb-6">
                {/* Header da seção */}
                <div className="flex items-center justify-between mb-6 px-2">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-[#FF0000] to-[#FF4444] rounded-full flex items-center justify-center">
                            <Youtube className="w-5 h-5 text-white" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">Últimos Vídeos</h2>
                    </div>
                </div>

                {/* Skeleton loading */}
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex-shrink-0 w-72 bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
                            <div className="h-40 bg-gray-300"></div>
                            <div className="p-4">
                                <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                                <div className="h-3 bg-gray-200 rounded w-3/4 mb-3"></div>
                                <div className="flex gap-4">
                                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                                    <div className="h-3 bg-gray-200 rounded w-12"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        );
    }

    if (error || videos.length === 0) {
        return (
            <section className="mt-8 mb-6">
                <div className="flex items-center justify-between mb-6 px-2">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-[#FF0000] to-[#FF4444] rounded-full flex items-center justify-center">
                            <Youtube className="w-5 h-5 text-white" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">Últimos Vídeos</h2>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                    <Youtube className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600">Vídeos serão exibidos aqui em breve!</p>
                </div>
            </section>
        );
    }

    return (
        <section className="mt-8 mb-6">
            {/* Header da seção */}
            <div className="flex items-center justify-between mb-6 px-2">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#FF0000] to-[#FF4444] rounded-full flex items-center justify-center">
                        <Youtube className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Últimos Vídeos</h2>
                </div>
                <Link
                    href="https://www.youtube.com/@chamanozap5983"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[#FF0000] hover:text-[#CC0000] font-semibold text-sm transition-colors"
                >
                    <span>Ver canal</span>
                    <Play className="w-4 h-4" />
                </Link>
            </div>

            {/* Lista horizontal de vídeos */}
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {videos.map((video) => (
                    <Link
                        key={video.id}
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 w-72 group cursor-pointer"
                    >
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            {/* Thumbnail do vídeo */}
                            <div className="relative w-full h-40 overflow-hidden">
                                <Image
                                    src={video.thumbnail.url}
                                    alt={video.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />

                                {/* Overlay com ícone de play */}
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                                    <div className="w-12 h-12 bg-red-600 bg-opacity-90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                                        <Play className="w-6 h-6 text-white ml-1" />
                                    </div>
                                </div>

                                {/* Duração do vídeo */}
                                <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {formatDuration(video.duration)}
                                </div>

                                {/* Badge para Shorts */}
                                {video.type === 'short' && (
                                    <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded font-semibold">
                                        SHORTS
                                    </div>
                                )}
                            </div>

                            {/* Informações do vídeo */}
                            <div className="p-4">
                                <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-2 group-hover:text-red-600 transition-colors">
                                    {video.title}
                                </h3>

                                <div className="flex items-center justify-between text-xs text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <Eye className="w-3 h-3" />
                                        {formatViewCount(video.viewCount)} views
                                    </div>
                                    <span>{getTimeAgo(video.publishedAt)}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}

// Componente de loading para a seção
export function YouTubeConfigurableSkeleton() {
    return (
        <section className="mt-8 mb-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-gray-300 rounded"></div>
                    <div className="h-6 bg-gray-300 rounded w-32"></div>
                </div>
                <div className="h-4 bg-gray-300 rounded w-20"></div>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-2">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex-shrink-0 w-72 bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
                        <div className="h-40 bg-gray-300"></div>
                        <div className="p-4">
                            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                            <div className="h-3 bg-gray-200 rounded w-3/4 mb-3"></div>
                            <div className="flex gap-4">
                                <div className="h-3 bg-gray-200 rounded w-16"></div>
                                <div className="h-3 bg-gray-200 rounded w-12"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
