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
    <html lang="pt" className="bg-neutral-100">
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
