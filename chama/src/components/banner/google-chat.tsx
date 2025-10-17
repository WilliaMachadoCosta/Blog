'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';

declare global {
    interface Window {
        adsbygoogle?: unknown[];
    }
}

interface GoogleAdProps {
    slot: string;
    format?: string;
    style?: React.CSSProperties;
    className?: string;
}

export default function GoogleAdChat({
    slot,
    format = 'auto',
    style = {},
    className = '',
}: GoogleAdProps) {
    const adRef = useRef<HTMLModElement>(null);

    useEffect(() => {
        if (!adRef.current) return;

        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            console.log('AdSense error:', e);
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
                className={`w-full flex justify-center overflow-hidden ${className}`}
                style={{ minHeight: '100px', ...style }}
            >
                <ins
                    ref={adRef}
                    className="adsbygoogle"
                    style={{
                        display: 'block',
                        width: '100%',
                        textAlign: 'center',
                    }}
                    data-ad-client="ca-pub-5074393689985715"
                    data-ad-slot={slot}
                    data-ad-format={format}
                    data-full-width-responsive="true"
                />
            </div>
        </>
    );
}
