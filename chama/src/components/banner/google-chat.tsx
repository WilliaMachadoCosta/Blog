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
    className = '',
}: GoogleAdProps) {
    const adRef = useRef<HTMLModElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!adRef.current) return;

        // Inicia AdSense
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            console.warn('AdSense push error', e);
        }

        const wrapper = wrapperRef.current;
        if (!wrapper) return;

        // 🔍 Observa múltiplos iframes (Google cria mais de um às vezes)
        const resizeObserver = new ResizeObserver(() => {
            const iframes = wrapper.querySelectorAll('iframe');
            let maxHeight = 0;

            iframes.forEach((iframe) => {
                const rect = iframe.getBoundingClientRect();
                if (rect.height > maxHeight) maxHeight = rect.height;
            });

            if (maxHeight > 0) {
                wrapper.style.height = `${maxHeight}px`;
            }
        });

        const mutationObserver = new MutationObserver(() => {
            const iframes = wrapper.querySelectorAll('iframe');
            iframes.forEach((iframe) => resizeObserver.observe(iframe));
        });

        mutationObserver.observe(wrapper, { childList: true, subtree: true });

        return () => {
            resizeObserver.disconnect();
            mutationObserver.disconnect();
        };
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
                ref={wrapperRef}
                className={`google-ad-wrapper w-full mx-auto ${className}`}
                style={{
                    display: 'block',
                    textAlign: 'center',
                    width: '100%',
                    maxWidth: '100%',
                    overflow: 'visible', // 🔥 permite que o Google expanda sem corte
                    position: 'relative',
                    minHeight: '120px', // altura inicial segura
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