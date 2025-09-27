'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';

declare global {
    interface Window {
        adsbygoogle?: unknown[];
    }
}

interface GoogleAdRelaxedProps {
    className?: string;
}

export default function GoogleAdRelaxed({ className = '' }: GoogleAdRelaxedProps) {
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
                id="adsbygoogle-relaxed-js"
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5074393689985715"
                strategy="afterInteractive"
                crossOrigin="anonymous"
            />

            <div
                ref={adRef}
                className={`flex justify-center items-center my-6 ${className}`}
                style={{ overflow: 'visible' }}
            >
                <ins
                    className="adsbygoogle"
                    style={{ display: 'block', width: '100%' }}
                    data-ad-client="ca-pub-5074393689985715"
                    data-ad-slot="3396968575"
                    data-ad-format="autorelaxed"
                />
            </div>
        </>
    );
}
