// 'use client';

import Script from 'next/script';
import { useRef } from 'react';

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

    return (
        <>
            <Script
                id="adsbygoogle-js"
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5074393689985715"
                strategy="afterInteractive"
                crossOrigin="anonymous"
                onLoad={() => {
                    try {
                        (window.adsbygoogle = window.adsbygoogle || []).push({});
                    } catch (_) {
                        // Silencia erros do AdSense
                    }
                }}
            />

            {/* Espaço reservado (não interfere no ad-format:auto) */}
            <div ref={adRef} className={`w-full flex justify-center min-h-[90px] ${className}`}>
                <ins
                    className="adsbygoogle"
                    style={{ display: 'block' }}
                    data-ad-client="ca-pub-5074393689985715"
                    data-ad-slot="9365926617"
                    data-ad-format="auto"
                    data-full-width-responsive="true"
                />
            </div>
        </>
    );
}
