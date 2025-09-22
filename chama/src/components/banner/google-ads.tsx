'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';
import AdContainer from './ad-container';

// 🧠 Corrige o erro de TypeScript
declare global {
    interface Window {
        adsbygoogle?: unknown[];
    }
}

interface GoogleAdProps {
    className?: string;
}

export default function GoogleAd({ className = '' }: GoogleAdProps) {
    const adRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Aguarda o script carregar e faz o push
        const timeout = setTimeout(() => {
            try {
                if (window.adsbygoogle && adRef.current) {
                    window.adsbygoogle.push({});
                }
            } catch (e) {
                // Ignora erros do AdSense
            }
        }, 500);

        // MutationObserver para interceptar quando o Google AdSense adiciona o wrapper
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        const element = node as Element;

                        // Procura por elementos do Google AdSense
                        if (element.id === 'mys-wrapper' || element.classList.contains('ns-c07oy')) {
                            // Força o comportamento desejado
                            element.setAttribute('style', `
                                align-items: flex-start !important;
                                justify-content: flex-start !important;
                                position: relative !important;
                                display: block !important;
                                width: 100% !important;
                                height: auto !important;
                                top: auto !important;
                                left: auto !important;
                                overflow: visible !important;
                            `);
                        }

                        // Procura recursivamente por elementos do Google AdSense
                        const googleElements = element.querySelectorAll('#mys-wrapper, [id*="mys-wrapper"], .ns-c07oy, [class*="ns-c07oy"]');
                        googleElements.forEach((el) => {
                            el.setAttribute('style', `
                                align-items: flex-start !important;
                                justify-content: flex-start !important;
                                position: relative !important;
                                display: block !important;
                                width: 100% !important;
                                height: auto !important;
                                top: auto !important;
                                left: auto !important;
                                overflow: visible !important;
                            `);
                        });
                    }
                });
            });
        });

        // Observa mudanças no container do anúncio
        if (adRef.current) {
            observer.observe(adRef.current, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['style', 'class']
            });
        }

        // Adiciona CSS dinâmico após o carregamento
        const styleTimeout = setTimeout(() => {
            const style = document.createElement('style');
            style.id = 'google-ads-override';
            style.textContent = `
                /* Sobrescreve completamente o comportamento do Google AdSense */
                .ad-container #mys-wrapper,
                .ad-container div[id*="mys-wrapper"] {
                    align-items: flex-start !important;
                    justify-content: flex-start !important;
                    position: relative !important;
                    display: block !important;
                    width: 100% !important;
                    height: auto !important;
                    top: auto !important;
                    left: auto !important;
                    overflow: visible !important;
                }
                
                .ad-container .ns-c07oy-l-banner-small-vanilla,
                .ad-container div[class*="ns-c07oy"] {
                    margin: 0 auto !important;
                    display: block !important;
                    width: 100% !important;
                    max-width: 100% !important;
                }
                
                /* Força o anúncio a seguir o layout do container */
                .ad-container ins.adsbygoogle {
                    display: block !important;
                    margin: 0 auto !important;
                }
                
                /* Wrapper adicional para forçar o comportamento */
                .google-ad-wrapper {
                    display: flex !important;
                    justify-content: center !important;
                    align-items: flex-start !important;
                    width: 100% !important;
                    position: relative !important;
                }
                
                .google-ad-wrapper > div {
                    display: flex !important;
                    justify-content: center !important;
                    width: 100% !important;
                }
            `;
            document.head.appendChild(style);
        }, 1000);

        return () => {
            clearTimeout(timeout);
            clearTimeout(styleTimeout);
            observer.disconnect();
            // Remove o estilo quando o componente for desmontado
            const existingStyle = document.getElementById('google-ads-override');
            if (existingStyle) {
                existingStyle.remove();
            }
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
            <style>{`
                .adslot_1 {
                    display: block !important;
                    width: 320px !important;
                    min-height: 100px !important;
                    height: auto !important;
                    max-width: 100% !important;
                    overflow: hidden !important;
                }
                @media (min-width: 500px) {
                    .adslot_1 {
                        width: 468px !important;
                        min-height: 60px !important;
                    }
                }
                @media (min-width: 800px) {
                    .adslot_1 {
                        width: 728px !important;
                        min-height: 90px !important;
                    }
                }
                @media (min-width: 1100px) {
                    .adslot_1.grande {
                        width: 970px !important;
                        min-height: 90px !important;
                    }
                }
                /* Garante que o anúncio não ultrapasse os limites */
                .ad-container ins {
                    max-width: 100% !important;
                    overflow: hidden !important;
                }
            `}</style>

            <AdContainer className={className}>
                <div
                    ref={adRef}
                    className="google-ad-wrapper"
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        width: '100%',
                        position: 'relative'
                    }}
                >
                    <ins
                        className="adsbygoogle google-ad-wrapper"
                        data-ad-client="ca-pub-5074393689985715"
                        data-ad-slot="9365926617"
                        data-ad-format='horizontal'
                        style={{
                            display: 'block',
                            textAlign: 'center',
                            minHeight: '100px',
                            width: '100%',
                            position: 'relative'
                        }}
                    />
                </div>
            </AdContainer>
        </>
    );
}
