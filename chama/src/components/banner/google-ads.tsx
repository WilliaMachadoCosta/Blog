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
            <style>{`
                .adslot_1 {
                    display: block !important;
                    width: 320px !important;
                    min-height: 100px !important;
                    height: auto !important;
                    max-width: 100% !important;
                    overflow: hidden !important;
                }
                @media (min-width: 500px) {
                    .adslot_1 {
                        width: 468px !important;
                        min-height: 60px !important;
                    }
                }
                @media (min-width: 800px) {
                    .adslot_1 {
                        width: 728px !important;
                        min-height: 90px !important;
                    }
                }
                @media (min-width: 1100px) {
                    .adslot_1.grande {
                        width: 970px !important;
                        min-height: 90px !important;
                    }
                }
                /* Garante que o anúncio não ultrapasse os limites */
                .ad-container ins {
                    max-width: 100% !important;
                    overflow: hidden !important;
                }
            `}</style>

            <AdContainer className={className}>
                <div ref={adRef} className="w-full flex justify-center items-center">
                    <ins
                        className="adsbygoogle adslot_1"
                        data-ad-client="ca-pub-5074393689985715"
                        data-ad-slot="9365926617"
                    />
                </div>
            </AdContainer>
        </>
    );
}
