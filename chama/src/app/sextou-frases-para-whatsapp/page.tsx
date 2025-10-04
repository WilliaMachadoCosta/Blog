'use client';

import { Suspense } from 'react';
import GeradorMensagemGenerico from '@/components/posts-templates/gerador-mensagem-generico';
import { mensagensSextaFeira } from '@/data/mensagens-sexta-feira';

export const dynamic = 'force-dynamic';

export default function SextouFrasesWhatsapp() {
    return (
        <Suspense fallback={<div>Carregando post...</div>}>
            <GeradorMensagemGenerico
                data={mensagensSextaFeira}
                fileName="sextou-frase"
            />
        </Suspense>
    );
}
