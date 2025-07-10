'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';
import AdContainer from './ad-container';

// 🧠 Corrige o erro de TypeScript
declare global {
    interface Window {
        adsbygoogle?: unknown[];
    }
}

interface GoogleAdProps {
    className?: string;
}

export default function GoogleAd({ className = '' }: GoogleAdProps) {
    const adRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        // Função para carregar o anúncio
        const loadAd = () => {
            try {
                if (window.adsbygoogle && adRef.current) {
                    console.log('Carregando anúncio Google AdSense...');
                    window.adsbygoogle.push({});
                } else {
                    console.log('Google AdSense não está disponível ainda');
                }
            } catch (e) {
                console.error('Erro ao carregar anúncio:', e);
            }
        };

        // Tenta carregar imediatamente
        loadAd();
        
        // Se não funcionar, tenta novamente após um delay
        const timeout = setTimeout(loadAd, 1000);
        
        // Tenta mais algumas vezes com intervalos maiores
        const timeout2 = setTimeout(loadAd, 2000);
        const timeout3 = setTimeout(loadAd, 5000);
        
        return () => {
            clearTimeout(timeout);
            clearTimeout(timeout2);
            clearTimeout(timeout3);
        };
    }, []);

    return (
        <>
            <Script
                id="adsbygoogle-js"
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5074393689985715"
                strategy="afterInteractive"
                crossOrigin="anonymous"
                onLoad={() => {
                    console.log('Script do Google AdSense carregado');
                }}
                onError={(e) => {
                    console.error('Erro ao carregar script do Google AdSense:', e);
                }}
            />

            <AdContainer className={className}>
                <div ref={adRef} className="w-full flex justify-center">
                    <ins
                        className="adsbygoogle"
                        style={{
                            display: 'block',
                            textAlign: 'center'
                        }}
                        data-ad-client="ca-pub-5074393689985715"
                        data-ad-slot="9365926617"
                        data-ad-format="auto"
                        data-full-width-responsive="true"
                    />
                </div>
            </AdContainer>
        </>
    );
}
