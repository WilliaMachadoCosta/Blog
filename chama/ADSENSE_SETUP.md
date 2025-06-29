# Configuração do Google AdSense

Este documento explica como os anúncios do Google AdSense foram configurados no projeto.

## Estrutura dos Anúncios

### 1. Script Principal
O script do Google AdSense foi adicionado no `layout.tsx` principal para ser carregado globalmente:

```tsx
<Script
  async
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5074393689985715"
  crossOrigin="anonymous"
  strategy="afterInteractive"
/>
```

### 2. Componentes de Anúncio

#### GoogleAdSense.tsx
Componente principal para anúncios horizontais responsivos.

#### GoogleAdSenseVertical.tsx
Componente para anúncios verticais (sidebar).

### 3. Configuração Centralizada
Arquivo `src/config/ads.ts` centraliza todas as configurações:

```tsx
export const ADS_CONFIG = {
    AD_CLIENT: 'ca-pub-5074393689985715',
    SLOTS: {
        HORIZONTAL_MAIN: '9365926617',
        VERTICAL_SIDEBAR: '9365926617',
        BETWEEN_POSTS: '9365926617',
        FOOTER: '9365926617',
    }
};
```

## Locais dos Anúncios

### 1. Página Principal (`/`)
- Entre as seções de empresas e blog
- Dentro da seção de blog

### 2. Página de Blog (`/blog`)
- Entre o filtro de categorias e a lista de posts

### 3. Páginas de Post Individual (`/[slug]`)
- Entre o conteúdo do post e os botões de compartilhamento

## Como Adicionar Novos Anúncios

### 1. Usando o componente existente:

```tsx
import GoogleAdSense from '@/components/banner/GoogleAdSense';
import { getAdConfig, shouldShowAds } from '@/config/ads';

{shouldShowAds() && (
    <div className="my-4">
        <GoogleAdSense 
            {...getAdConfig('HORIZONTAL_MAIN')}
            className="w-full"
        />
    </div>
)}
```

### 2. Criando um novo slot:

1. Adicione o novo slot em `src/config/ads.ts`:
```tsx
SLOTS: {
    // ... outros slots
    NEW_SLOT: 'seu-novo-slot-id',
}
```

2. Use o novo slot:
```tsx
<GoogleAdSense 
    {...getAdConfig('NEW_SLOT')}
    className="w-full"
/>
```

## Configurações de Desenvolvimento

- Os anúncios são automaticamente desabilitados em ambiente de desenvolvimento
- Use `shouldShowAds()` para controlar a exibição condicional

## Boas Práticas

1. **Não exceda 3 anúncios por página** (configurado em `ADS_CONFIG.DISPLAY.MAX_ADS_PER_PAGE`)
2. **Mantenha distância mínima** entre anúncios (200px configurado)
3. **Use anúncios responsivos** para melhor experiência mobile
4. **Teste em diferentes dispositivos** antes de publicar

## Troubleshooting

### Anúncios não aparecem:
1. Verifique se o `AD_CLIENT` está correto
2. Confirme se o `AD_SLOT` está ativo no Google AdSense
3. Verifique se não há bloqueadores de anúncios ativos
4. Em desenvolvimento, os anúncios são desabilitados por padrão

### Erros no console:
- Verifique se o script do AdSense está carregando corretamente
- Confirme se as configurações de CORS estão corretas

## Notas Importantes

- O Google AdSense pode levar algumas horas para começar a exibir anúncios
- Certifique-se de que seu site está aprovado pelo Google AdSense
- Monitore o desempenho dos anúncios através do painel do AdSense
- Respeite as políticas do Google AdSense para evitar penalizações 