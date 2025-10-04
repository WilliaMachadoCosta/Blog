# Gerador de Mensagens Genérico

Este sistema permite criar páginas de mensagens para WhatsApp de forma genérica, reutilizando a mesma lógica visual e funcionalidade.

## Como Usar

### 1. Estrutura dos Dados

Use a interface `MensagemData` definida em `@/types/mensagem-data.ts`:

```typescript
interface MensagemData {
  titulo: string;
  descricao: string;
  mensagens: string[];
  imagens: string[];
  coresFundo?: string[];
  seo: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
    ogImage: string;
    url: string;
  };
  infoSection?: {
    titulo: string;
    paragrafos: string[];
  };
  dicas?: {
    titulo: string;
    lista: string[];
  };
  frasesOcasiao?: {
    titulo: string;
    paragrafos: string[];
  };
}
```

### 2. Criando Dados (JSON)

Crie um arquivo JSON em `src/data/`:

```json
{
  "titulo": "Seu Título Aqui",
  "descricao": "Sua descrição aqui...",
  "mensagens": [
    "Mensagem 1",
    "Mensagem 2"
  ],
  "imagens": [
    "url1",
    "url2"
  ],
  "seo": {
    "title": "SEO Title",
    "description": "SEO Description",
    "ogTitle": "OG Title",
    "ogDescription": "OG Description", 
    "ogImage": "og-image-url",
    "url": "page-url"
  }
}
```

### 3. Criando Dados (TypeScript)

Crie um arquivo TS em `src/data/`:

```typescript
import { MensagemData } from '@/types/mensagem-data';

export const meusDados: MensagemData = {
  titulo: "Meu Título",
  descricao: "Minha descrição...",
  mensagens: ["Mensagem 1", "Mensagem 2"],
  imagens: ["url1", "url2"],
  seo: {
    title: "SEO Title",
    description: "SEO Description",
    ogTitle: "OG Title", 
    ogDescription: "OG Description",
    ogImage: "og-image-url",
    url: "page-url"
  }
};
```

### 4. Criando a Página

Crie uma página em `src/app/sua-pagina/page.tsx`:

```typescript
'use client';

import { Suspense } from 'react';
import GeradorMensagemGenerico from '@/components/posts-templates/gerador-mensagem-generico';
import { meusDados } from '@/data/meus-dados'; // ou importe o JSON

export const dynamic = 'force-dynamic';

export default function MinhaPagina() {
    return (
        <Suspense fallback={<div>Carregando post...</div>}>
            <GeradorMensagemGenerico 
                data={meusDados} 
                fileName="nome-arquivo-download"
            />
        </Suspense>
    );
}
```

## Exemplos Criados

1. **Bom Dia (JSON)**: `/bom-dia-generico`
2. **Motivação (TS)**: `/mensagens-motivacao` 
3. **Boa Noite (TS)**: `/boa-noite-generico`

## Funcionalidades Incluídas

- ✅ Cards responsivos com imagens
- ✅ Cores aleatórias de fundo
- ✅ Botões de copiar, baixar e compartilhar
- ✅ SEO otimizado (meta tags, Open Graph, Twitter)
- ✅ Seções informativas opcionais
- ✅ Integração com Google Ads
- ✅ Exportação de imagens dos cards

## Vantagens

- **Reutilização**: Mesma lógica para diferentes tipos de mensagens
- **Flexibilidade**: Suporte a JSON e TypeScript
- **Manutenibilidade**: Mudanças no componente afetam todas as páginas
- **SEO**: Meta tags configuráveis por página
- **Escalabilidade**: Fácil adição de novos tipos de mensagens