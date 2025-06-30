// src/app/layout.tsx

import Header from '@/components/header/Header'
import './globals.css'
import { Footer } from '@/components/footer/footer'
import Script from 'next/script'




export const metadata = {
  title: 'Meu site',
  description: 'Descrição do site',
}



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt" className="bg-neutral-100">
      <head>
        {/* Metatags de verificação */}
        <meta name="msvalidate.01" content="09EFB24C7F86C6EC11550597A3D4A1DE" />
        <meta name="google-site-verification" content="oNTWJA1YzjgaEx4CCGjnl4kbpxk058p0TLKSyIVmhNs" />
        <meta name="msvalidate.01" content="2A882223291B6B632B1DED256F291FE8" />
        {/* Google AdSense Script */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5074393689985715"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        {/* Funding Choices (ant block google) */}
        <Script
          async
          src="https://fundingchoicesmessages.google.com/i/pub-5074393689985715?ers=1"
          nonce="BojMnZHyFUjZyBBFk9E92Q"
          strategy="afterInteractive"
        />
        <Script id="ant-block-google" nonce="BojMnZHyFUjZyBBFk9E92Q" strategy="afterInteractive">
          {`(function() {function signalGooglefcPresent() {if (!window.frames['googlefcPresent']) {if (document.body) {const iframe = document.createElement('iframe'); iframe.style = 'width: 0; height: 0; border: none; z-index: -1000; left: -1000px; top: -1000px;'; iframe.style.display = 'none'; iframe.name = 'googlefcPresent'; document.body.appendChild(iframe);} else {setTimeout(signalGooglefcPresent, 0);}}}signalGooglefcPresent();})();`}
        </Script>
        {/* AMP auto ads */}
        <Script
          async
          custom-element="amp-auto-ads"
          src="https://cdn.ampproject.org/v0/amp-auto-ads-0.1.js"
          strategy="afterInteractive"
        />
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
        {/* JSON-LD Schema.org */}
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
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Meu site" />
        <meta property="og:description" content="Descrição do site" />
        <meta property="og:url" content="https://chamanozap.net/" />
        <meta property="og:site_name" content="chamanozap.net" />
        <meta property="og:image" content="https://chamanozap.net/logo.png" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Meu site" />
        <meta name="twitter:description" content="Descrição do site" />
        <meta name="twitter:site" content="@SeuTwitter" />
        <meta name="twitter:image" content="https://chamanozap.net/logo.png" />
        {/* Canonical */}
        <link rel="canonical" href="https://chamanozap.net/" />
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
      </head>
      <body className="flex flex-col h-screen bg-neutral-100 text-black overflow-x-hidden">
        {/* Header fixo */}
        <div className="fixed top-0 left-0 w-full z-50">
          <Header />
        </div>

        {/* Container com sidebars e conteúdo */}
        <div className="flex flex-1 pt-[60px] pb-[50px] h-full bg-neutral-100 overflow-x-hidden">

          {/* Conteúdo principal */}
          <main className="flex-1 overflow-y-auto overflow-x-hidden px-2 sm:px-4 bg-[#f5f3ef]">
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

// Componente de monitor de cache (lazy load)
async function CacheMonitor() {
  const { default: Monitor } = await import('@/components/debug/cache-monitor');
  return <Monitor />;
}
