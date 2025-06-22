// src/app/layout.tsx

import Header from '@/components/header/Header'
import './globals.css'
import { Footer } from '@/components/footer/footer'



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
      <body>
        <Header />

        {children}
        <Footer />
      </body>
    </html>
  )
}
