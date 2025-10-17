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
    className?: string;
}

export default function GoogleAdRecize({
    slot,
    format = 'auto',
    className = '',
}: GoogleAdProps) {
    const adRef = useRef<HTMLModElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ad = adRef.current;
        if (!ad) return;

        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            console.log('AdSense error:', e);
        }

        // 🧩 Observa o iframe criado pelo Google e ajusta o container
        const observer = new ResizeObserver(() => {
            const iframe = ad.querySelector('iframe');
            if (iframe && wrapperRef.current) {
                const rect = iframe.getBoundingClientRect();
                wrapperRef.current.style.height = `${rect.height}px`;
            }
        });

        // Espera o iframe aparecer
        const checkIframe = setInterval(() => {
            const iframe = ad.querySelector('iframe');
            if (iframe) {
                observer.observe(iframe);
                clearInterval(checkIframe);
            }
        }, 300);

        return () => {
            observer.disconnect();
            clearInterval(checkIframe);
        };
    }, []);

    return (
        <>
            {/* Script oficial do AdSense */}
            <Script
                id="adsbygoogle-js"
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5074393689985715"
                strategy="afterInteractive"
                crossOrigin="anonymous"
            />

            {/* Container flexível */}
            <div
                ref={wrapperRef}
                className={`google-ad-wrapper w-full mx-auto ${className}`}
                style={{
                    display: 'block',
                    textAlign: 'center',
                    width: '100%',
                    maxWidth: '100%',
                    overflow: 'visible',
                    position: 'relative',
                    minHeight: '100px', // altura inicial de segurança
                    transition: 'height 0.3s ease',
                }}
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
