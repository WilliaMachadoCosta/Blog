import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['chamanozap.net'],
  },
  
  // Configuração de rewrites para resolver conflitos com WordPress
  async rewrites() {
    return [
      // Redirecionar requisições da API do WordPress para o hostgator
      {
        source: '/wp-json/:path*',
        destination: 'https://chamanozap.net/wp-json/:path*',
      },
      // Redirecionar requisições de arquivos de mídia do WordPress
      {
        source: '/wp-content/:path*',
        destination: 'https://chamanozap.net/wp-content/:path*',
      },
      // Redirecionar requisições de arquivos do sistema do WordPress
      {
        source: '/wp-includes/:path*',
        destination: 'https://chamanozap.net/wp-includes/:path*',
      },
    ];
  },

  // Configuração de headers para evitar conflitos
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
