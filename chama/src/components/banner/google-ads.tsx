'use client';

import { useEffect } from 'react';
import Script from 'next/script';

// 🧠 Corrige o erro de TypeScript
declare global {
    interface Window {
        adsbygoogle?: unknown[];
    }
}

export default function GoogleAd() {
    useEffect(() => {
        setTimeout(() => {
            if (window.adsbygoogle) {
                window.adsbygoogle.push({});
            }
        }, 500);
    }, []);

    return (
        <div
            style={{
                width: '100%',
                maxWidth: '320px',
                position: 'relative',
                zIndex: 10,
                margin: '16px auto',
                minHeight: '100px',
            }}
        >
            <Script
                async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5074393689985715"
                crossOrigin="anonymous"
                strategy="afterInteractive"
            />
            <ins
                className="adsbygoogle"
                style={{
                    display: 'block',
                }}
                data-ad-client="ca-pub-5074393689985715"
                data-ad-slot="5586358508"
                data-ad-format="auto"
                data-full-width-responsive="true"
            />
        </div>
    );
}
