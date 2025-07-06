'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';

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
            <style>{`
                .adsbygoogle {
                    display: block;
                    width: 100%;
     
                }
            `}</style>


            {/* Anúncio fixo 320x250 */}
            <div className={`flex justify-center ${className}`}>
                <ins
                    className="adsbygoogle"
                    style={{ display: 'inline-block', width: '320px', height: '250px' }}
                    data-ad-client="ca-pub-5074393689985715"
                    data-ad-slot="8640543084"
                    ref={adRef as any}
                />
            </div>
        </>
    );
}
