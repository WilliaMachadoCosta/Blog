'use client';

import { useEffect } from 'react';

export default function GoogleAd() {
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (typeof window !== 'undefined' && window.adsbygoogle && Array.isArray(window.adsbygoogle)) {
                try {
                    window.adsbygoogle.push({});
                } catch (e) {
                    console.error("Erro ao renderizar o anúncio:", e);
                }
            }
        }, 1000); // aguarda 1 segundo para garantir que o script carregue

        return () => clearTimeout(timeout);
    }, []);

    return (
        <ins
            className="adsbygoogle"
            style={{ display: 'block', textAlign: 'center' }}
            data-ad-client="ca-pub-3940256099942544"  // ID de teste
            data-ad-slot="1234567890"
            data-ad-format="auto"
            data-full-width-responsive="true"
        />
    );
}
