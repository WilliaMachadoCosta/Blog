'use client';

import { useEffect } from 'react';

interface GoogleAdSenseVerticalProps {
    adClient: string;
    adSlot: string;
    className?: string;
}

export default function GoogleAdSenseVertical({ adClient, adSlot, className = "" }: GoogleAdSenseVerticalProps) {
    useEffect(() => {
        // Carrega o script do Google AdSense se ainda não estiver carregado
        if (typeof window !== 'undefined' && !window.adsbygoogle) {
            const script = document.createElement('script');
            script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`;
            script.async = true;
            script.crossOrigin = 'anonymous';
            document.head.appendChild(script);
        }

        // Inicializa o anúncio quando o componente montar
        if (typeof window !== 'undefined' && window.adsbygoogle) {
            try {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            } catch (error) {
                console.error('Erro ao carregar anúncio vertical:', error);
            }
        }
    }, [adClient]);

    return (
        <div className={`ad-container-vertical ${className}`}>
            <ins
                className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client={adClient}
                data-ad-slot={adSlot}
                data-ad-format="vertical"
                data-full-width-responsive="false"
            />
        </div>
    );
}

// Declaração global para TypeScript
declare global {
    interface Window {
        adsbygoogle: any[];
    }
} 