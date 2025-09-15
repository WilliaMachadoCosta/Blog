import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const maxResults = parseInt(searchParams.get('maxResults') || '10');

        // Ler o arquivo de configuração
        const configPath = path.join(process.cwd(), 'src', 'config', 'youtube-videos.json');
        const configData = fs.readFileSync(configPath, 'utf8');
        const config = JSON.parse(configData);

        // Verificar se temos a API key do YouTube
        const apiKey = process.env.YOUTUBE_API_KEY;

        if (!apiKey) {
            console.warn('YOUTUBE_API_KEY não encontrada. Usando dados da lista configurada com thumbnails do YouTube.');
            return NextResponse.json({
                items: generateVideosFromConfig(config, maxResults)
            });
        }

        // Extrair IDs dos vídeos da configuração
        const videoIds = config.videos.slice(0, maxResults).map((video: any) => video.id);

        if (videoIds.length === 0) {
            return NextResponse.json({ items: [] });
        }

        // Buscar detalhes dos vídeos específicos
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoIds.join(',')}&key=${apiKey}`
        );

        if (!response.ok) {
            throw new Error(`YouTube API error: ${response.status}`);
        }

        const data = await response.json();

        // Combinar dados da API com configuração
        const enrichedItems = data.items.map((item: any) => {
            const configVideo = config.videos.find((v: any) => v.id === item.id);
            console.log("Para ver o que tem no video #########", item);
            return {
                id: item.id,
                title: configVideo?.title || item.snippet.title,
                description: configVideo?.description || item.snippet.description,
                thumbnail: {
                    url: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default.url,
                    width: item.snippet.thumbnails.medium?.width || 480,
                    height: item.snippet.thumbnails.medium?.height || 360
                },
                publishedAt: item.snippet.publishedAt,
                duration: item.contentDetails.duration,
                viewCount: item.statistics.viewCount,
                channelTitle: item.snippet.channelTitle,
                type: configVideo?.type || 'video',
                url: configVideo?.url || `https://www.youtube.com/watch?v=${item.id}`
            };
        });

        return NextResponse.json({
            items: enrichedItems
        });

    } catch (error) {
        console.error('Erro ao buscar vídeos configuráveis do YouTube:', error);

        // Retornar dados mockados em caso de erro

    }
}

function generateVideosFromConfig(config: any, count: number) {
    const videos = config.videos.slice(0, count).map((video: any, index: number) => ({
        id: video.id,
        title: video.title,
        description: video.description,
        thumbnail: {
            // Usar thumbnail real do YouTube baseado no ID
            url: `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`,
            width: 480,
            height: 360
        },
        publishedAt: new Date(Date.now() - (index * 86400000)).toISOString(),
        duration: video.type === 'short' ? 'PT0M30S' : 'PT5M30S',
        viewCount: (Math.floor(Math.random() * 10000) + 1000).toString(),
        channelTitle: config.settings?.channelTitle || 'Chama no Zap',
        type: video.type,
        url: video.url
    }));

    return videos;
}

function generateMockVideosFromConfig(config: any, count: number) {
    const mockVideos = config.videos.slice(0, count).map((video: any, index: number) => ({
        id: video.id,
        title: video.title,
        description: video.description,
        thumbnail: {
            // Usar thumbnail real do YouTube baseado no ID
            url: `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`,
            width: 480,
            height: 360
        },
        publishedAt: new Date(Date.now() - (index * 86400000)).toISOString(),
        duration: video.type === 'short' ? 'PT0M30S' : 'PT5M30S',
        viewCount: (Math.floor(Math.random() * 10000) + 1000).toString(),
        channelTitle: config.settings?.channelTitle || 'Chama no Zap',
        type: video.type,
        url: video.url
    }));

    return mockVideos;
}
