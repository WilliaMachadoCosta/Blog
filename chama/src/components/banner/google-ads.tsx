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
        // Aguardar um pouco para garantir que o script carregou
        setTimeout(() => {
            if (window.adsbygoogle) {
                console.log('AdSense script carregado, executando push...');
                window.adsbygoogle = window.adsbygoogle || [];
                window.adsbygoogle.push({});
                console.log('AdSense push executado');
            } else {
                console.log('AdSense script não encontrado');
            }
        }, 1000);
    }, []);

    return (
        <div className="my-6 w-full">
            {/* Script do AdSense */}
            <Script
                async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5074393689985715"
                crossOrigin="anonymous"
                strategy="afterInteractive"
            />

            {/* Container do anúncio */}
            <div className="bg-gray-100 rounded-lg p-2">
                <div style={{ paddingTop: '30px' }}>
                    <ins
                        className="adsbygoogle"
                        style={{
                            display: 'block',
                            textAlign: 'center'
                        }}
                        data-ad-client="ca-pub-5074393689985715"
                        data-ad-slot="5586358508"
                        data-ad-format="auto"
                        data-full-width-responsive="true"
                    />
                </div>
            </div>
        </div>
    );
}
