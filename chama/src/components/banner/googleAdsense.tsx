'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';

declare global {
    interface Window {
        adsbygoogle?: unknown[];
    }
}

interface GoogleAdProps {
    className?: string;
    slot: string;      // <--- adicionado
    format?: string;   // <--- adicionado
}

export default function GoogleAdsense({ className = '', slot, format = 'auto' }: GoogleAdProps) {
    const adRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        try {
            if (window.adsbygoogle && adRef.current) {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            }
        } catch (e) {
            // ignora erros do AdSense
        }
    }, []);

    return (
        <>
            <Script
                id="adsbygoogle-js"
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5074393689985715"
                strategy="afterInteractive"
                crossOrigin="anonymous"
            />

            <div
                ref={adRef}
                className={className}
                style={{ display: 'block', width: '100%', margin: '1rem 0' }}
            >
                <ins
                    className="adsbygoogle"
                    style={{ display: 'block', width: '100%' }}
                    data-ad-client="ca-pub-5074393689985715"
                    data-ad-slot={slot}
                    data-ad-format={format}
                />
            </div>
        </>
    );
}
