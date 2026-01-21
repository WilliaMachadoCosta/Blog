# Estrutura de Dados - Arquivos Individuais

## Por que arquivos individuais?

Para escalar para 500+ páginas, cada página tem seu próprio arquivo JSON. Isso oferece:

✅ **Performance**: Carrega apenas o arquivo necessário (não todos os 500+)
✅ **Manutenção**: Fácil de editar uma página específica
✅ **Cache**: Navegador pode fazer cache individual por página
✅ **Escalabilidade**: Não há limite prático de páginas

## Estrutura de Diretórios

```
public/data/
├── whatsapp/
│   ├── expresso-guanabara.json
│   ├── gontijo.json
│   └── [slug].json
└── review/
    └── [slug].json
```

## Como Adicionar uma Nova Página

### 1. Criar o arquivo JSON

Crie um arquivo em `public/data/whatsapp/[slug].json` ou `public/data/review/[slug].json`

**Exemplo:** `public/data/whatsapp/minha-empresa.json`

```json
{
  "slug": "minha-empresa",
  "title": "Título da Página",
  "description": "Meta description para SEO",
  "h1": "H1 da página",
  "intro": "Primeiro parágrafo...\n\nSegundo parágrafo...",
  "whatsapp": {
    "number": "5511999999999",
    "text": "Olá, quero comprar uma passagem"
  },
  "contacts": [
    {
      "label": "SAC",
      "value": "0800 123 4567",
      "type": "phone"
    },
    {
      "label": "Site Oficial",
      "value": "https://www.exemplo.com.br/",
      "type": "link"
    }
  ],
  "sections": [
    {
      "title": "Título da Seção",
      "content": "Conteúdo da seção..."
    }
  ],
  "relatedLinks": [
    {
      "text": "Link relacionado",
      "url": "#"
    }
  ]
}
```

### 2. A URL será gerada automaticamente

- Arquivo: `public/data/whatsapp/minha-empresa.json`
- URL: `/whatsapp-minha-empresa`

- Arquivo: `public/data/review/produto-x.json`
- URL: `/review-produto-x`

## Estrutura Completa do JSON

### Campos Obrigatórios

- `slug`: Identificador único (usado na URL)
- `title`: Título da página (aparece na aba do navegador)
- `description`: Meta description (SEO)
- `h1`: Título principal da página

### Campos Opcionais

- `intro`: Texto introdutório (primeiro parágrafo)
- `whatsapp`: Objeto com número e mensagem inicial
- `contacts`: Array de contatos (telefone, links)
- `sections`: Array de seções de conteúdo
- `relatedLinks`: Array de links relacionados

### Tipos de Seções

#### Seção Simples
```json
{
  "title": "Título",
  "content": "Conteúdo..."
}
```

#### Seção com Passos
```json
{
  "title": "Título",
  "content": "Introdução...",
  "steps": [
    {
      "number": "1",
      "title": "Título do Passo",
      "content": "Conteúdo do passo..."
    }
  ]
}
```

#### Seção com Serviços
```json
{
  "title": "Título",
  "content": "Introdução...",
  "services": [
    {
      "label": "Telefone",
      "value": "0800 123 4567"
    }
  ]
}
```

## Migração de Arquivos Antigos

Os arquivos antigos (`whatsapp.json` e `review.json`) podem ser mantidos como backup, mas não são mais usados pelo sistema.

Para migrar páginas antigas:

1. Abra o arquivo antigo (`whatsapp.json`)
2. Para cada objeto no array, crie um arquivo individual
3. Salve como `public/data/whatsapp/[slug].json`

## Vantagens da Nova Estrutura

| Aspecto | Antes (Array único) | Agora (Arquivos individuais) |
|---------|-------------------|------------------------------|
| **Carregamento** | 500+ páginas (ex: 2MB) | 1 página (ex: 4KB) |
| **Tempo de resposta** | Lento (carrega tudo) | Rápido (carrega só o necessário) |
| **Cache** | Tudo ou nada | Individual por página |
| **Manutenção** | Difícil (arquivo gigante) | Fácil (um arquivo por página) |
| **Conflitos Git** | Alto risco | Baixo risco |
| **Escalabilidade** | Limitada | Ilimitada |
