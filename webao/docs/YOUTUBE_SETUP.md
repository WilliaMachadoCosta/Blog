# Configuração da API do YouTube

## Visão Geral

O componente `YouTubeVideos` foi adicionado para exibir os últimos vídeos do canal "Chama no Zap" entre a seção de empresas e as últimas postagens na página principal.

## Funcionalidades

- ✅ Scroll horizontal para lista de vídeos
- ✅ Thumbnails dos vídeos com overlay de play
- ✅ Informações de duração, visualizações e data de publicação
- ✅ Link direto para o canal no YouTube
- ✅ Fallback com dados mockados caso a API não esteja disponível
- ✅ Loading skeleton durante o carregamento

## Configuração da API do YouTube

### 1. Obter API Key

1. Acesse o [Google Cloud Console](https://console.developers.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Ative a **YouTube Data API v3**
4. Crie credenciais (API Key)
5. Copie a API key gerada

### 2. Configurar Variável de Ambiente

Adicione a seguinte variável ao seu arquivo `.env.local`:

```bash
YOUTUBE_API_KEY=sua_api_key_aqui
```

### 3. Configuração do Canal

O componente está configurado para buscar vídeos do canal:
- **Channel ID**: `UCchamanozap5983`
- **Canal**: [Chama no Zap](https://www.youtube.com/@chamanozap5983)

## Estrutura dos Arquivos

```
webao/src/
├── components/container/
│   └── youtube-videos.tsx          # Componente principal
├── app/api/youtube/videos/
│   └── route.ts                    # API route para buscar vídeos
└── components/container/
    └── container.tsx               # Integração na página principal
```

## Como Funciona

1. **Carregamento**: O componente faz uma requisição para `/api/youtube/videos`
2. **API Route**: Busca os vídeos mais recentes usando a YouTube Data API v3
3. **Fallback**: Se a API não estiver disponível, exibe dados mockados
4. **Renderização**: Exibe os vídeos em um scroll horizontal responsivo

## Personalização

### Alterar Número de Vídeos

```tsx
<YouTubeVideos channelId="UCchamanozap5983" maxResults={8} />
```

### Alterar Canal

```tsx
<YouTubeVideos channelId="SEU_CHANNEL_ID" maxResults={6} />
```

## Estilos

O componente utiliza:
- Tailwind CSS para estilização
- Gradiente vermelho do YouTube (`from-[#FF0000] to-[#FF4444]`)
- Scroll horizontal com `scrollbar-hide`
- Hover effects e transições suaves
- Design responsivo

## Troubleshooting

### API Key não configurada
- O componente funcionará com dados mockados
- Verifique se `YOUTUBE_API_KEY` está definida no `.env.local`

### Rate Limit da API
- A API do YouTube tem limites de requisições
- O componente inclui tratamento de erros e fallback

### Canal não encontrado
- Verifique se o Channel ID está correto
- O componente tenta resolver usernames automaticamente

