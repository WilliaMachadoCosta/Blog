'use client';

import { useEffect } from 'react';

interface GoogleAdSenseProps {
    adClient: string;
    adSlot: string;
    className?: string;
}

export default function GoogleAdSense({ adClient, adSlot, className = "" }: GoogleAdSenseProps) {
    useEffect(() => {
        // Carrega o script do Google AdSense
        if (typeof window !== 'undefined' && !window.adsbygoogle) {
            const script = document.createElement('script');
            script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`;
            script.async = true;
            script.crossOrigin = 'anonymous';
            document.head.appendChild(script);
        }

        // Inicializa o anúncio
        if (typeof window !== 'undefined' && window.adsbygoogle) {
            try {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            } catch (error) {
                console.error('Erro ao carregar anúncio:', error);
            }
        }
    }, [adClient]);

    return (
        <div className={`ad-container ${className}`}>
            <ins
                className="adsbygoogle"
                style={{ 
                    display: 'block',
                    width: '100%',
                    height: '250px'
                }}
                data-ad-client={adClient}
                data-ad-slot={adSlot}
                data-ad-format="auto"
                data-full-width-responsive="true"
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