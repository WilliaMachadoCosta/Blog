'use client';

import YouTubeConfigurable, { YouTubeConfigurableSkeleton } from './youtube-configurable';

interface YouTubeVideosProps {
    channelId?: string;
    maxResults?: number;
}

export default function YouTubeVideos({ 
    channelId = "UCchamanozap5983", 
    maxResults = 8 
}: YouTubeVideosProps) {
    // Usar o componente configurável
    return <YouTubeConfigurable maxResults={maxResults} />;
}

// Componente de loading para a seção
export function YouTubeVideosSkeleton() {
    return <YouTubeConfigurableSkeleton />;
}
