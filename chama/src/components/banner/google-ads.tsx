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

    // Tamanhos da janela baseados no prop
    const windowSizes = {
        small: 'w-32 h-24',
        medium: 'w-48 h-32',
        large: 'w-64 h-40'
    };

    return (
        <div className={`relative ${className} overflow-hidden`}>
            {/* CSS para tamanhos exatos do AdSense */}
            <style>{`
                .adslot_1 { display: block; width: 320px; height: 100px; }
                @media (min-width: 500px) { .adslot_1 { width: 468px; height: 60px; } }
                @media (min-width: 800px) { .adslot_1 { width: 728px; height: 90px; } }
            `}</style>
            {/* Container do anúncio em background */}
            <div
                ref={adRef}
                className="absolute inset-0 z-0"
                style={{
                    backgroundColor: '#f0f0f0',
                    height: '90px'
                }}
            >
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

            {/* Overlay escuro que cobre todo o anúncio */}
            <div className="absolute inset-0 z-10 bg-black bg-opacity-40"></div>

            {/* Janela que revela o anúncio */}
            <div className={`relative z-20 ${windowSizes[windowSize]} mx-auto`}>
                {/* Área transparente que mostra o anúncio através da janela */}
                <div
                    className="absolute inset-0 bg-transparent"
                    style={{
                        mask: 'radial-gradient(circle at center, transparent 0%, transparent 70%, black 100%)',
                        WebkitMask: 'radial-gradient(circle at center, transparent 0%, transparent 70%, black 100%)'
                    }}
                >
                    {/* Borda da janela */}
                    <div className="w-full h-full border-2 border-white border-opacity-60 rounded-lg shadow-2xl">
                        {/* Conteúdo visível através da janela */}
                        <div className="w-full h-full bg-transparent flex items-center justify-center">
                            <div className="text-center">
                                <div className="text-white text-xs mb-1 font-semibold drop-shadow-lg">Anúncio</div>
                                <div className="w-6 h-6 mx-auto bg-white bg-opacity-30 rounded-full flex items-center justify-center backdrop-blur-sm">
                                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Efeito de brilho na borda da janela */}
                <div className="absolute inset-0">
                    <div className="w-full h-full border-2 border-white border-opacity-30 rounded-lg shadow-[0_0_25px_rgba(255,255,255,0.4)]"></div>
                </div>

                {/* Efeito de reflexo na janela */}
                <div className="absolute inset-0">
                    <div
                        className="w-full h-full rounded-lg opacity-20"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)'
                        }}
                    ></div>
                </div>
            </div>

            {/* Efeito de partículas flutuantes ao redor da janela */}
            <div className="absolute inset-0 z-15 pointer-events-none">
                <div className={`${windowSizes[windowSize]} mx-auto relative`}>
                    <div className="absolute -top-2 -left-2 w-2 h-2 bg-white bg-opacity-40 rounded-full animate-pulse"></div>
                    <div className="absolute -top-1 -right-1 w-1 h-1 bg-white bg-opacity-30 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    <div className="absolute -bottom-2 left-1/4 w-1.5 h-1.5 bg-white bg-opacity-35 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>
            </div>
        </div>
    );
}
