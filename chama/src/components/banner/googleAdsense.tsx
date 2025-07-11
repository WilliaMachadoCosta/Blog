'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';

declare global {
    interface Window {
        adsbygoogle?: unknown[];
    }
}

export default function GoogleAdsense() {
    const adRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        try {
            if (window.adsbygoogle) {
                window.adsbygoogle.push({});
            }
        } catch (e) {
            console.error(e);
        }
    }, []);

    return (
        <>
            {/* Script do Google AdSense */}
            <Script
                id="adsbygoogle-init"
                strategy="afterInteractive"
                crossOrigin="anonymous"
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5074393689985715"
            />

            {/* Estrutura visual estilo site que você mostrou */}
            <section className="max-w-[100vw] flex flex-col items-center justify-center text-center w-full overflow-hidden">
                <span style={{ fontSize: '10px', marginBottom: '8px' }}>Publicidade</span>
                <div
                    style={{
                        width: '300px',
                        height: '250px',
                        maxWidth: '300px',
                        maxHeight: '250px',
                        overflow: 'hidden',
                    }}
                >
                    <ins
                        className="adsbygoogle"
                        style={{
                            display: 'inline-block',
                            width: '300px',
                            height: '250px',
                        }}
                        data-ad-client="ca-pub-5074393689985715"
                        data-ad-slot="8640543084"
                    />
                </div>
            </section>
        </>
    );
}
