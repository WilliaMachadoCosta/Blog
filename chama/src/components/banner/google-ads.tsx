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
                .adslot_1 { display: block; width: 320px; height: 100px; }
                @media (min-width: 500px) { .adslot_1 { width: 468px; height: 60px; } }
                @media (min-width: 800px) { .adslot_1 { width: 728px; height: 90px; } }
            `}</style>
            <div ref={adRef} className={`w-full flex justify-center ${className}`}>
                <ins
                    className="adsbygoogle adslot_1"
                    style={{ display: 'block' }}
                    data-ad-client="ca-pub-5074393689985715"
                    data-ad-slot="9365926617"

                />
            </div>
        </>
    );
}
