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
            script.setAttribute('data-ad-client', 'ca-pub-3940256099942544');
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
        <div className="my-6">
            <ins
                className="adsbygoogle"
                style={{ display: 'block', backgroundColor: '#f0f0f0', height: '90px', textAlign: 'center' }}
                data-ad-client="ca-pub-3940256099942544"
                data-ad-slot="1234567890"
                data-ad-format="auto"
                data-full-width-responsive="true"
            />
        </div>
    );
}
