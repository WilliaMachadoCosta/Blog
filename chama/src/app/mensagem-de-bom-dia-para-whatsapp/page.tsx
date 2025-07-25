// app/gerar-post/page.tsx
import GeradorMensagemBomdia from '@/components/posts-templates/gerador-mensagem-bom-dia';
import { Suspense } from 'react';


export const dynamic = 'force-dynamic';

export default function MensagemBomdia() {
    return (
        <Suspense fallback={<div>Carregando post...</div>}>
            <GeradorMensagemBomdia />
        </Suspense>
    );
}
