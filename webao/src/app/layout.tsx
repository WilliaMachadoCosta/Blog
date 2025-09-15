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

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Webao - Suporte Técnico",
  description: "A Webao é sua plataforma de suporte técnico e desenvolvimento de sistemas. Oferecemos soluções completas para sua empresa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" className="bg-neutral-100">
      <head>
        <meta name="google-site-verification" content="U7FyXiaQb1HX4vXf7lBdxip1NGWDq83wWtrqH1TLFSI" />

        <Script
          id="adsense-init"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5074393689985715"
          crossOrigin="anonymous"
        />

        {/* Microsoft Clarity Script */}
        <Script id="clarity-script" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "nviib1pqrd");
          `}
        </Script>

        {/* JSON-LD Schema.org - WebSite */}
        <Script id="ld-json-website" type="application/ld+json">
          {`
            {
              "@context": "http://schema.org",
              "@type": "WebSite",
              "url": "https://webao.info/",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://webao.info/?s={search_term}",
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
              "url": "https://webao.info/",
              "logo": "https://webao.info/logo.png",
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

        {/* SiteNavigationElement Structured Data */}
        <Script id="site-navigation-jsonld" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "ItemList",
              "itemListElement": [
                {
                  "@type": "SiteNavigationElement",
                  "position": 1,
                  "name": "Início",
                  "url": "https://webao.info/"
                },
                {
                  "@type": "SiteNavigationElement",
                  "position": 2,
                  "name": "Mensagens",
                  "url": "https://webao.info/mensagens"
                },
                {
                  "@type": "SiteNavigationElement",
                  "position": 3,
                  "name": "Ferramentas",
                  "url": "https://webao.info/ferramentas"
                },
                {
                  "@type": "SiteNavigationElement",
                  "position": 4,
                  "name": "Blog",
                  "url": "https://webao.info/blog"
                },
                {
                  "@type": "SiteNavigationElement",
                  "position": 5,
                  "name": "Categorias",
                  "url": "https://webao.info/categorias"
                }
              ]
            }
          `}
        </Script>
      </head>

      <body className="flex flex-col h-screen bg-gray-50 text-black overflow-x-hidden" style={{ position: 'relative', zIndex: 1 }}>
        <div className="fixed top-0 left-0 w-full z-50">
          <Header />
        </div>

        <div className="flex flex-1 pt-[60px] pb-[50px] h-full bg-gray-50 overflow-x-hidden" style={{ position: 'relative', zIndex: 2 }}>
          {/* Layout Instagram - Centralizado com largura máxima */}
          <main className="flex-1 overflow-y-auto overflow-x-hidden px-4 sm:px-6 pb-28 max-w-4xl mx-auto w-full" style={{ position: 'relative', zIndex: 3 }}>
            <div className="max-w-full overflow-hidden">
              {children}
            </div>
          </main>
        </div>

        <div className="fixed bottom-0 left-0 w-full z-50">
          <Footer />
        </div>


      </body>
    </html>
  );
}
