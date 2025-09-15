# Configuração da API do YouTube

## Como obter títulos e thumbnails reais dos vídeos

### 1. Obter API Key do YouTube

1. Acesse: https://console.developers.google.com/
2. Crie um novo projeto ou selecione um existente
3. Ative a **YouTube Data API v3**
4. Crie uma credencial (API Key)
5. Copie a chave gerada

### 2. Configurar no projeto

Crie um arquivo `.env.local` na raiz do projeto com:

```env
YOUTUBE_API_KEY=sua_api_key_aqui
```

### 3. O que a API fornece

Com a API key configurada, o sistema buscará automaticamente:

- ✅ **Títulos reais** dos vídeos
- ✅ **Thumbnails reais** do YouTube (alta qualidade)
- ✅ **Duração real** dos vídeos
- ✅ **Número real** de visualizações
- ✅ **Data de publicação** real
- ✅ **Descrições reais** dos vídeos

### 4. Fallback sem API

Sem a API key, o sistema usa:
- Títulos personalizados do arquivo de configuração
- Thumbnails do YouTube (via URL direta)
- Dados simulados para duração e visualizações

### 5. Vantagens da API

- **Dados sempre atualizados**: Títulos, visualizações e duração em tempo real
- **Thumbnails de alta qualidade**: Imagens nativas do YouTube
- **Informações precisas**: Dados oficiais do YouTube
- **Performance**: Cache automático dos dados

### 6. Limitações da API

- **Cota diária**: 10.000 unidades por dia (gratuito)
- **Rate limiting**: Máximo 100 requisições por 100 segundos
- **Custo**: Gratuito até o limite, depois pago

### 7. Monitoramento

Para monitorar o uso da API:
1. Acesse: https://console.developers.google.com/
2. Vá em "APIs & Services" > "Quotas"
3. Monitore o uso da YouTube Data API v3

### 8. Exemplo de uso

```typescript
// Com API key configurada
const response = await fetch('/api/youtube/videos/configurable');
const data = await response.json();

// data.items contém:
// - title: "Título real do YouTube"
// - thumbnail.url: "https://i.ytimg.com/vi/ID/maxresdefault.jpg"
// - viewCount: "12345" (número real)
// - duration: "PT5M30S" (duração real)
// - publishedAt: "2024-01-15T10:30:00Z" (data real)
```

### 9. Troubleshooting

**Erro 403 (Quota exceeded)**
- Aguarde 24h para resetar a cota
- Verifique se não há outras aplicações usando a mesma API key

**Erro 400 (Bad Request)**
- Verifique se os IDs dos vídeos estão corretos
- Verifique se os vídeos não são privados

**Thumbnails não carregam**
- Verifique se os IDs dos vídeos existem
- Teste a URL: `https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg`

