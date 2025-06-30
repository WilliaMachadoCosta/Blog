'use client';

import { useEffect } from 'react';

interface GoogleAdSenseProps {
    adClient: string;
    adSlot: string;
    className?: string;
}

export default function GoogleAdSense({ adClient, adSlot, className = "" }: GoogleAdSenseProps) {
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
                console.error('Erro ao carregar anúncio:', error);
            }
        }
    }, [adClient]);

    // Monitora e corrige problemas de posicionamento dos anúncios
    useEffect(() => {
        const fixAdPositioning = () => {
            if (typeof window === 'undefined') return;

            // Encontra todos os anúncios na página
            const ads = document.querySelectorAll('.adsbygoogle');
            
            ads.forEach((ad) => {
                const adElement = ad as HTMLElement;
                
                // Garante que o anúncio não tenha posição absoluta ou fixed
                if (adElement.style.position === 'absolute' || adElement.style.position === 'fixed') {
                    adElement.style.position = 'relative';
                }
                
                // Garante que o z-index seja baixo
                if (parseInt(adElement.style.zIndex || '0') > 10) {
                    adElement.style.zIndex = '1';
                }
                
                // Garante que não cubra toda a tela
                if (adElement.style.width === '100vw' || adElement.style.height === '100vh') {
                    adElement.style.width = '100%';
                    adElement.style.height = 'auto';
                }
                
                // Verifica se há iframes dentro do anúncio
                const iframes = adElement.querySelectorAll('iframe');
                iframes.forEach((iframe) => {
                    const iframeElement = iframe as HTMLElement;
                    iframeElement.style.position = 'relative';
                    iframeElement.style.zIndex = '1';
                    iframeElement.style.maxWidth = '100%';
                    iframeElement.style.height = 'auto';
                });
            });
        };

        // Executa imediatamente
        fixAdPositioning();
        
        // Executa após um delay para garantir que os anúncios foram carregados
        const timer = setTimeout(fixAdPositioning, 1000);
        
        // Executa periodicamente para corrigir problemas que possam surgir
        const interval = setInterval(fixAdPositioning, 5000);
        
        return () => {
            clearTimeout(timer);
            clearInterval(interval);
        };
    }, []);

    return (
        <div className={`ad-container ${className}`} style={{ 
            position: 'relative',
            width: '100%',
            maxWidth: '100%',
            overflow: 'hidden',
            margin: '1rem 0',
            zIndex: 1
        }}>
            <ins
                className="adsbygoogle"
                style={{ 
                    display: 'block',
                    position: 'relative',
                    width: '100%',
                    maxWidth: '100%',
                    height: 'auto',
                    minHeight: '90px',
                    maxHeight: '600px',
                    zIndex: 1,
                    overflow: 'hidden'
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