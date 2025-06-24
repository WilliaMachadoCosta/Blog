// src/app/layout.tsx

import Header from '@/components/header/Header'
import './globals.css'
import { Footer } from '@/components/footer/footer'
import AdBanner from '@/components/banner/adBanner'



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
    <html lang="pt">
      <body className="flex flex-col min-h-screen">
        <Header />
        <AdBanner />

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
