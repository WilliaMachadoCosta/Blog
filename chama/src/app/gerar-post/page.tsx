// app/gerar-post/page.tsx
import TweetGeneratorClient from '@/components/container/gerarpostTweetCard';
import { Suspense } from 'react';


export const dynamic = 'force-dynamic';

export default function TweetGeneratorPage() {
    return (
        <Suspense fallback={<div>Carregando post...</div>}>
            <TweetGeneratorClient />
        </Suspense>
    );
}
