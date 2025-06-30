import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Lista de rotas que devem ser redirecionadas para o WordPress no hostgator
  const wordpressRoutes = [
    '/wp-json',        // API do WordPress
    '/wp-content',     // Arquivos de mídia e uploads
    '/wp-includes',    // Arquivos do sistema WordPress
    '/wp-cron.php',    // Cron do WordPress
    '/xmlrpc.php',     // XML-RPC (se necessário)
    '/.well-known',    // Certificados SSL, etc.
  ];

  // Verificar se a rota atual deve ser redirecionada para o WordPress
  const shouldRedirectToWordPress = wordpressRoutes.some(route => 
    pathname.startsWith(route)
  );

  if (shouldRedirectToWordPress) {
    // Redirecionar para o WordPress no hostgator
    const wordpressUrl = new URL(pathname, 'https://chamanozap.net');
    wordpressUrl.search = request.nextUrl.search;
    
    return NextResponse.rewrite(wordpressUrl);
  }

  // Para todas as outras rotas, continuar com o Next.js
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|logos|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}; 