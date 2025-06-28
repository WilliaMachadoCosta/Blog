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
      <body className="flex flex-col h-screen overflow-hidden bg-neutral-100 text-black">
        {/* Header fixo */}
        <div className="fixed top-0 left-0 w-full z-50">
          <Header />
        </div>

        {/* Container com sidebars e conteúdo */}
        <div className="flex flex-1 pt-[60px] pb-[50px] overflow-hidden h-full bg-neutral-100">
          {/* Sidebar esquerda */}
          <aside className="hidden lg:block w-64 p-4 bg-white shadow-inner overflow-y-auto">
            <div className="sticky top-[60px]">
              <p className="font-bold mb-2 text-neutral-400">📌 Links úteis</p>
              <ul className="text-sm space-y-2">
                <li><a href="#" className="text-blue-600 hover:underline">Promoções</a></li>
                <li><a href="#" className="text-blue-600 hover:underline">Contato</a></li>
                <li><a href="#" className="text-blue-600 hover:underline">Blog</a></li>
              </ul>
            </div>
          </aside>

          {/* Conteúdo principal */}
          <main className="flex-1 overflow-y-auto px-4 bg-white">
            {children}
          </main>

          {/* Sidebar direita */}
          <aside className="hidden xl:block w-72 p-4 bg-white shadow-inner overflow-y-auto">
            <div className="sticky top-[60px]">
              <p className="font-bold mb-2 text-neutral-400">📰 Notícias</p>
              <ul className="text-sm space-y-2">
                <li><a href="#" className="text-blue-600 hover:underline">Últimas atualizações</a></li>
                <li><a href="#" className="text-blue-600 hover:underline">Dicas de viagem</a></li>
              </ul>
            </div>
          </aside>
        </div>

        {/* Footer fixo */}
        <div className="fixed bottom-0 left-0 w-full z-50">
          <Footer />
        </div>
      </body>
    </html>
  );
}
