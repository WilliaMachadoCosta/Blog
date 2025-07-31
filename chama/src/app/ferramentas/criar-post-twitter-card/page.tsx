
import TweetCreatorClient from '@/components/posts-templates/tweet-card/gerarpostTweetCard';
import { Suspense } from 'react';


export const dynamic = 'force-dynamic';
export const runtime = 'edge';
export default function TweetGeneratorPage() {
    return (
        <Suspense fallback={<div>Carregando post...</div>}>
            <TweetCreatorClient />
        </Suspense>
    );
}
