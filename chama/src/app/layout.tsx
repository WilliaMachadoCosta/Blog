// src/app/layout.tsx

import Header from '@/components/header/Header'
import './globals.css'
import { Footer } from '@/components/footer/footer'
import { Nunito } from "next/font/google";
import AdBanner from '@/components/banner/adBanner';



export const metadata = {
  title: 'Meu site',
  description: 'Descrição do site',
}

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-nunito",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt" className={nunito.variable}>
      <body className="flex flex-col h-screen overflow-hidden font-nunito">
        <div className="fixed top-0 left-0 w-full z-50">
          <Header />
          <AdBanner />
        </div>

        {/* Conteúdo central rolável */}
        <main className="flex-1 overflow-y-auto pt-[160px] pb-[60px]">
          {children}
        </main>

        {/* Footer fixo */}
        <div className="fixed bottom-0 left-0 w-full z-50">
          <Footer />
        </div>
      </body>
    </html>
  );
}
