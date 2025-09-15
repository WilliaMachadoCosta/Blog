import MensagensPage from '@/components/posts-templates/menssagens/mensagens-page';
import { Suspense } from 'react';


export const dynamic = 'force-dynamic';

export default function TweetGeneratorPage() {
    return (
        <Suspense fallback={<div>Carregando post...</div>}>
            <MensagensPage />
        </Suspense>
    );
}
