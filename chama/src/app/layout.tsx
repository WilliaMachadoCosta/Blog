import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import { Footer } from "@/components/footer/footer";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chama no Zap - WhatsApp",
  description:
    "O Chama no Zap é sua plataforma de conexão direta com as principais empresas e serviços do Brasil.",
  verification: {
    google: "U7FyXiaQb1HX4vXf7lBdxip1NGWDq83wWtrqH1TLFSI",
  },
  openGraph: {
    title: "Chama no Zap - WhatsApp",
    description: "Conecte-se facilmente com empresas e serviços via WhatsApp.",
    url: "https://chamanozap.net/",
    siteName: "Chama no Zap",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Altura aproximada do footer fixo
  const FOOTER_HEIGHT = 80; // px

  return (
    <html lang="pt" className="bg-[#f5f3ef]">
      <body
        className={`${inter.className} flex flex-col min-h-screen bg-[#f5f3ef] text-black overflow-x-hidden`}
        style={{ position: "relative", zIndex: 1 }}
      >
        {/* Scripts de terceiros */}
        <Script
          id="adsense-init"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5074393689985715"
          crossOrigin="anonymous"
        />

        <Script id="clarity-script" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "nviib1pqrd");
          `}
        </Script>

        {/* JSON-LD WebSite */}
        <Script id="ld-json-website" type="application/ld+json">
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

        {/* JSON-LD Organization */}
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

        {/* JSON-LD SiteNavigation */}
        <Script id="site-navigation-jsonld" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "ItemList",
              "itemListElement": [
                {"@type": "SiteNavigationElement","position":1,"name":"Início","url":"https://chamanozap.net/"},
                {"@type": "SiteNavigationElement","position":2,"name":"Mensagens","url":"https://chamanozap.net/mensagens"},
                {"@type": "SiteNavigationElement","position":3,"name":"Ferramentas","url":"https://chamanozap.net/ferramentas"},
                {"@type": "SiteNavigationElement","position":4,"name":"Blog","url":"https://chamanozap.net/blog"},
                {"@type": "SiteNavigationElement","position":5,"name":"Calculadoras","url":"https://chamanozap.net/calculadoras"}
              ]
            }
          `}
        </Script>

        {/* Header */}
        <Header />

        {/* Main */}
        <main 
          className="flex-1 bg-[#f5f3ef]"
          style={{ paddingBottom: FOOTER_HEIGHT }}
        >
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
