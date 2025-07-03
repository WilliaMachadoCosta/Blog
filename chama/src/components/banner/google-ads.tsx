'use client';

import { useEffect, useRef } from 'react';

// 🧠 Corrige o erro de TypeScript
declare global {
    interface Window {
        adsbygoogle?: unknown[];
    }
}

interface GoogleAdProps {
    className?: string;
    windowSize?: 'small' | 'medium' | 'large';
}

export default function GoogleAd({ className = '', windowSize = 'medium' }: GoogleAdProps) {
    const adRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setTimeout(() => {
            if (window.adsbygoogle) {
                window.adsbygoogle.push({});
            }
        }, 500);
    }, []);

    return (
        <div className={`flex justify-center ${className}`}>
            {/* CSS para tamanhos exatos do AdSense */}
            <style>{`
                .adslot_1 { display: block; width: 320px; height: 100px; }
                @media (min-width: 500px) { .adslot_1 { width: 468px; height: 60px; } }
                @media (min-width: 800px) { .adslot_1 { width: 728px; height: 90px; } }
            `}</style>
            <div ref={adRef}>
                <ins
                    className="adsbygoogle adslot_1"
                    style={{
                        display: 'block',
                        backgroundColor: '#f0f0f0',
                        textAlign: 'center'
                    }}
                    data-ad-client="ca-pub-5074393689985715"
                    data-ad-slot="9365926617"
                />
            </div>
        </div>
    );
}
