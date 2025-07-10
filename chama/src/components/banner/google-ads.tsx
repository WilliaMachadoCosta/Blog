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
        // Aguarda o script carregar e faz o push
        const timeout = setTimeout(() => {
            try {
                if (window.adsbygoogle && adRef.current) {
                    window.adsbygoogle.push({});
                }
            } catch (e) {
                // Ignora erros do AdSense
            }
        }, 500);
        
        return () => clearTimeout(timeout);
    }, []);

    return (
        <>
            <Script
                id="adsbygoogle-js"
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5074393689985715"
                strategy="afterInteractive"
                crossOrigin="anonymous"
            />

            <AdContainer className={className}>
                <div ref={adRef}>
                    <ins
                        className="adsbygoogle"
                        data-ad-client="ca-pub-5074393689985715"
                        data-ad-slot="9365926617"
                    />
                </div>
            </AdContainer>
        </>
    );
}
