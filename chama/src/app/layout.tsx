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
