// src/app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import { Footer } from "@/components/footer/footer";

import Script from 'next/script';
import CacheMonitor from "@/components/debug/cache-monitor";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chama - Blog de Viagens e Turismo",
  description: "Descubra os melhores destinos, dicas de viagem e experiências únicas. Seu guia completo para explorar o mundo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" className="bg-neutral-100">
      {/* Google AdSense Script */}
      {/* <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5074393689985715"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      /> */}
      {/* Funding Choices (ant block google) */}
      {/* <Script
        async
        src="https://fundingchoicesmessages.google.com/i/pub-5074393689985715?ers=1"
        nonce="BojMnZHyFUjZyBBFk9E92Q"
        strategy="afterInteractive"
      />
      <Script id="ant-block-google" nonce="BojMnZHyFUjZyBBFk9E92Q" strategy="afterInteractive">
        {`(function() {function signalGooglefcPresent() {if (!window.frames['googlefcPresent']) {if (document.body) {const iframe = document.createElement('iframe'); iframe.style = 'width: 0; height: 0; border: none; z-index: -1000; left: -1000px; top: -1000px;'; iframe.style.display = 'none'; iframe.name = 'googlefcPresent'; document.body.appendChild(iframe);} else {setTimeout(signalGooglefcPresent, 0);}}}signalGooglefcPresent();})();`}
      </Script> */}
      {/* AMP auto ads */}
      {/* <Script
        async
        custom-element="amp-auto-ads"
        src="https://cdn.ampproject.org/v0/amp-auto-ads-0.1.js"
        strategy="afterInteractive"
      /> */}
      {/* Google Analytics */}
      <Script id="gtag" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'UA-53750184-3');`}
      </Script>
      {/* Google Tag Manager */}
      <Script id="gtm" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-NGNZHGB');`}
      </Script>
      {/* JSON-LD Schema.org - WebSite */}
      <Script id="ld-json" type="application/ld+json" strategy="afterInteractive">
        {`
          {
            "@context": "http://schema.org",
            "@type": "WebSite",
            "url": "https://chamanozap.net/",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://chamanozap.net/?s={search_term}",
              "query-input": "required name=search_term"
            }
          }
        `}
      </Script>
      {/* Organization Structured Data */}
      <Script id="organization-ld-json" type="application/ld+json" strategy="afterInteractive">
        {`
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Wmc Webao Suporte Tecnico Manutencao e Desenvolvimento de Sistemas LTDA",
            "url": "https://chamanozap.net/",
            "logo": "https://chamanozap.net/logo.png",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "rua andorra",
              "addressLocality": "Itapevi",
              "addressRegion": "SP",
              "addressCountry": "BR"
            },
            "identifier": {
              "@type": "PropertyValue",
              "propertyID": "CNPJ",
              "value": "42385680000159"
            }
          }
        `}
      </Script>
      {/* Script de proteção contra anúncios que cobrem o conteúdo */}
      {/* <Script id="ad-protection" strategy="afterInteractive">
        {`
          (function() {
            function protectContentFromAds() {
              // Encontra todos os elementos que podem ser anúncios problemáticos
              const problematicElements = document.querySelectorAll('*[style*="position: fixed"], *[style*="position: absolute"], *[style*="z-index: 999"]');
              
              problematicElements.forEach(function(element) {
                const style = window.getComputedStyle(element);
                
                // Se o elemento está cobrindo toda a tela
                if (style.position === 'fixed' && 
                    (style.top === '0px' || style.top === '0') &&
                    (style.left === '0px' || style.left === '0') &&
                    (style.width === '100vw' || style.width === '100%') &&
                    (style.height === '100vh' || style.height === '100%')) {
                  
                  // Corrige o elemento para não cobrir toda a tela
                  element.style.position = 'relative';
                  element.style.top = 'auto';
                  element.style.left = 'auto';
                  element.style.width = '100%';
                  element.style.height = 'auto';
                  element.style.zIndex = '1';
                }
                
                // Se o z-index é muito alto
                if (parseInt(style.zIndex) > 100) {
                  element.style.zIndex = '1';
                }
              });
              
              // Específico para anúncios do Google AdSense
              const ads = document.querySelectorAll('.adsbygoogle, ins.adsbygoogle');
              ads.forEach(function(ad) {
                ad.style.position = 'relative';
                ad.style.zIndex = '1';
                ad.style.width = '100%';
                ad.style.maxWidth = '100%';
                ad.style.height = 'auto';
                ad.style.maxHeight = '600px';
                ad.style.overflow = 'hidden';
              });
              
              // Verifica iframes de anúncios
              const adIframes = document.querySelectorAll('iframe[src*="googlesyndication"], iframe[src*="doubleclick"]');
              adIframes.forEach(function(iframe) {
                iframe.style.position = 'relative';
                iframe.style.zIndex = '1';
                iframe.style.maxWidth = '100%';
                iframe.style.height = 'auto';
              });
            }
            
            // Executa imediatamente
            protectContentFromAds();
            
            // Executa após um delay
            setTimeout(protectContentFromAds, 1000);
            
            // Executa periodicamente
            setInterval(protectContentFromAds, 3000);
            
            // Observa mudanças no DOM
            if (typeof MutationObserver !== 'undefined') {
              const observer = new MutationObserver(protectContentFromAds);
              observer.observe(document.body, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['style']
              });
            }
          })();
        `}
      </Script> */}

      <body className="flex flex-col h-screen bg-neutral-100 text-black overflow-x-hidden" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header fixo */}
        <div className="fixed top-0 left-0 w-full z-50">
          <Header />
        </div>

        {/* Container com sidebars e conteúdo */}
        <div className="flex flex-1 pt-[60px] pb-[50px] h-full bg-neutral-100 overflow-x-hidden" style={{ position: 'relative', zIndex: 2 }}>

          {/* Conteúdo principal */}
          <main className="flex-1 overflow-y-auto overflow-x-hidden px-2 sm:px-4 bg-[#f5f3ef]" style={{ position: 'relative', zIndex: 3 }}>
            {children}
          </main>
        </div>

        {/* Footer fixo */}
        <div className="fixed bottom-0 left-0 w-full z-50">
          <Footer />
        </div>

        {/* Monitor de cache apenas em desenvolvimento */}
        {process.env.NODE_ENV === 'development' && (
          <div className="fixed bottom-2 sm:bottom-4 right-2 sm:right-4 z-50">
            <CacheMonitor />
          </div>
        )}
      </body>
    </html>
  );
}
