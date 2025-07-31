import ConversasPage from '@/components/posts-templates/chat/chat-simulador';
import { Suspense } from 'react';


export const dynamic = 'force-dynamic';
export const runtime = 'edge';

export default function TweetGeneratorPage() {
    return (
        <Suspense fallback={<div>Carregando post...</div>}>
            <ConversasPage />
        </Suspense>
    );
}
