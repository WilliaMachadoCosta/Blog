'use client';

import { useEffect } from 'react';

// 🧠 Corrige o erro de TypeScript
declare global {
    interface Window {
        adsbygoogle?: unknown[];
    }
}

export default function GoogleAd() {
    useEffect(() => {
        const scriptId = 'adsense-script';

        if (!document.getElementById(scriptId)) {
            const script = document.createElement('script');
            script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
            script.async = true;
            script.id = scriptId;
            script.setAttribute('data-ad-client', 'ca-pub-5074393689985715');
            document.head.appendChild(script);

            script.onload = () => {
                window.adsbygoogle = window.adsbygoogle || [];
                window.adsbygoogle.push({});
            };
        } else {
            setTimeout(() => {
                window.adsbygoogle = window.adsbygoogle || [];
                window.adsbygoogle.push({});
            }, 500);
        }
    }, []);

    return (
        <div className="my-6 w-full">
            <style jsx>{`
                .ad-wrapper {
                    min-height: 280px;
                    position: relative;
                    overflow: visible !important;
                    z-index: 100;
                }
                .ad-wrapper .adsbygoogle {
                    display: block !important;
                    background-color: transparent !important;
                    min-height: 280px !important;
                    width: 100% !important;
                    text-align: center !important;
                    position: relative !important;
                    z-index: 1000 !important;
                    overflow: visible !important;
                    max-width: none !important;
                    height: auto !important;
                }
                .ad-wrapper iframe {
                    position: relative !important;
                    z-index: 1000 !important;
                    max-width: 100% !important;
                    height: auto !important;
                }
            `}</style>
            <div className="bg-gray-100 rounded-lg p-4 ad-wrapper">
                <ins
                    className="adsbygoogle"
                    data-ad-client="ca-pub-5074393689985715"
                    data-ad-slot="9365926617"
                    data-ad-format="auto"
                    data-full-width-responsive="true"
                />
            </div>
        </div>
    );
}
