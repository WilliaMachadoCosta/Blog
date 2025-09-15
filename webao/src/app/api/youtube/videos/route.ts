import { NextRequest, NextResponse } from 'next/server';

// Tipos auxiliares
interface VideoDetail {
    duration: string;
    viewCount: string;
}

interface EnrichedVideo {
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
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const channelId = searchParams.get('channelId') || 'UCchamanozap5983';
        const maxResults = searchParams.get('maxResults') || '8';

        const apiKey = process.env.YOUTUBE_API_KEY;

        if (!apiKey) {
            console.warn('YOUTUBE_API_KEY não encontrada. Usando dados mockados.');
            return NextResponse.json({ items: [] });
        }

        // Primeiro, buscar o channel ID correto usando o username
        let actualChannelId = channelId;

        if (!channelId.startsWith('UC')) {
            const channelResponse = await fetch(
                `https://www.googleapis.com/youtube/v3/channels?part=id&forUsername=${channelId}&key=${apiKey}`
            );

            if (channelResponse.ok) {
                const channelData = await channelResponse.json();
                if (channelData.items && channelData.items.length > 0) {
                    actualChannelId = channelData.items[0].id;
                }
            }
        }

        // Buscar os vídeos do canal
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${actualChannelId}&maxResults=${maxResults}&order=date&type=video&key=${apiKey}`
        );

        if (!response.ok) {
            throw new Error(`YouTube API error: ${response.status}`);
        }

        const data = await response.json();

        // Extrair IDs de vídeos
        const videoIds = data.items.map((item: any) => item.id.videoId).join(',');

        // Buscar detalhes adicionais (duração, visualizações)
        const detailsResponse = await fetch(
            `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${videoIds}&key=${apiKey}`
        );

        let videoDetails: Record<string, VideoDetail> = {};
        if (detailsResponse.ok) {
            const detailsData = await detailsResponse.json();
            videoDetails = detailsData.items.reduce(
                (acc: Record<string, VideoDetail>, item: any) => {
                    acc[item.id] = {
                        duration: item.contentDetails.duration,
                        viewCount: item.statistics.viewCount,
                    };
                    return acc;
                },
                {}
            );
        }

        // Combinar os dados
        const enrichedItems: EnrichedVideo[] = data.items.map((item: any) => ({
            id: item.id.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnail: {
                url: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default.url,
                width: item.snippet.thumbnails.medium?.width || 480,
                height: item.snippet.thumbnails.medium?.height || 360,
            },
            publishedAt: item.snippet.publishedAt,
            duration: videoDetails[item.id.videoId]?.duration || 'PT0S',
            viewCount: videoDetails[item.id.videoId]?.viewCount || '0',
            channelTitle: item.snippet.channelTitle,
        }));

        return NextResponse.json({
            items: enrichedItems,
        });
    } catch (error) {
        console.error('Erro ao buscar vídeos do YouTube:', error);

        return NextResponse.json({
            items: [], // fallback vazio
        });
    }
}
