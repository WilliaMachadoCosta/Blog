// src/app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import { Footer } from "@/components/footer/footer";

import Script from 'next/script';
import CacheMonitor from "@/components/debug/cache-monitor";
import GoogleAd from "@/components/banner/google-ads";
import GoogleAdsense from "@/components/banner/googleAdsense";

// Declaração global para gtag
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chama no Zap - WhatsApp",
  description: "O Chama no Zap é sua plataforma de conexão direta com as principais empresas e serviços do Brasil. Facilitamos o contato entre você e as empresas que você precisa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" className="bg-neutral-100">
      <head>
        {/* <link rel="stylesheet" href="/globals.css" /> */}
        <meta name="google-site-verification" content="U7FyXiaQb1HX4vXf7lBdxip1NGWDq83wWtrqH1TLFSI" />
        <Script
          id="adsense-init"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5074393689985715"
          crossOrigin="anonymous"
        />

        {/* Microsoft Clarity Script */}
        <Script
          id="clarity-script"
          strategy="afterInteractive"
        >
          {`
      (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "nviib1pqrd");
    `}
        </Script>

      </head>

      {/* Google Analytics */}
      {/* <Script
        src="https://www.googletagmanager.com/gtag/js?id=UA-53750184-3"
        strategy="afterInteractive"
      />
      <Script id="gtag" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'UA-53750184-3');
        `}
      </Script> */}
      {/* Google Tag Manager */}
      {/* <Script id="gtm" >
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-NGNZHGB');`}
      </Script> */}
      {/* JSON-LD Schema.org - WebSite */}
      <Script id="ld-json" type="application/ld+json">
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
      <Script id="organization-ld-json" type="application/ld+json">
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


      <body className="flex flex-col h-screen bg-neutral-100 text-black overflow-x-hidden" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header fixo */}
        <div className="fixed top-0 left-0 w-full z-50">
          <Header />
        </div>

        {/* Container com sidebars e conteúdo */}
        <div className="flex flex-1 pt-[60px] pb-[50px] h-full bg-neutral-100 overflow-x-hidden" style={{ position: 'relative', zIndex: 2 }}>

          {/* Conteúdo principal */}
          <main className="flex-1 overflow-y-auto overflow-x-hidden px-2 sm:px-4 bg-[#f5f3ef] pb-28 max-w-full" style={{ position: 'relative', zIndex: 3 }}>

            <div className="max-w-full overflow-hidden">
              {children}
            </div>
          </main>

          {/* Sidebar direita (aparece só em telas grandes) */}
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
