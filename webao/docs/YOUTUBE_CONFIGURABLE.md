# Sistema de Vídeos do YouTube Configurável

## Visão Geral

Este sistema permite configurar uma lista específica de vídeos do YouTube que serão exibidos na seção de vídeos do site. A lista é mantida em um arquivo JSON configurável, facilitando a atualização sem necessidade de alterações no código.

## Arquivos Envolvidos

### 1. Arquivo de Configuração
- **Localização**: `src/config/youtube-videos.json`
- **Função**: Contém a lista de vídeos e configurações

### 2. Componente Principal
- **Localização**: `src/components/container/youtube-configurable.tsx`
- **Função**: Renderiza os vídeos baseado na configuração

### 3. API Route
- **Localização**: `src/app/api/youtube/videos/configurable/route.ts`
- **Função**: Busca informações detalhadas dos vídeos da lista

### 4. Wrapper
- **Localização**: `src/components/container/youtube-videos.tsx`
- **Função**: Wrapper que usa o componente configurável

## Como Configurar

### 1. Editar a Lista de Vídeos

Abra o arquivo `src/config/youtube-videos.json` e modifique a seção `videos`:

```json
{
  "videos": [
    {
      "id": "hsyEQWSt0kE",
      "title": "Título Personalizado do Vídeo 1",
      "description": "Descrição personalizada do vídeo 1",
      "type": "video",
      "url": "https://www.youtube.com/watch?v=hsyEQWSt0kE"
    },
    {
      "id": "1ETmybqdX-k",
      "title": "Título Personalizado do Short 1",
      "description": "Descrição personalizada do short 1",
      "type": "short",
      "url": "https://youtube.com/shorts/1ETmybqdX-k"
    }
  ]
}
```

### 2. Configurações Disponíveis

#### Por Vídeo:
- `id`: ID do vídeo do YouTube (obrigatório)
- `title`: Título personalizado (opcional - usa o título do YouTube se não informado)
- `description`: Descrição personalizada (opcional)
- `type`: Tipo do vídeo - "video" ou "short" (obrigatório)
- `url`: URL completa do vídeo (obrigatório)

#### Configurações Gerais:
- `maxResults`: Número máximo de vídeos a exibir
- `showThumbnails`: Exibir thumbnails (true/false)
- `showDuration`: Exibir duração (true/false)
- `showViewCount`: Exibir contagem de visualizações (true/false)
- `channelTitle`: Nome do canal

## Como Adicionar Novos Vídeos

1. **Obter o ID do vídeo**:
   - Para vídeos normais: `https://www.youtube.com/watch?v=ID_DO_VIDEO`
   - Para shorts: `https://www.youtube.com/shorts/ID_DO_SHORT`

2. **Adicionar ao JSON**:
   ```json
   {
     "id": "NOVO_ID_AQUI",
     "title": "Título Personalizado",
     "description": "Descrição personalizada",
     "type": "video", // ou "short"
     "url": "https://www.youtube.com/watch?v=NOVO_ID_AQUI"
   }
   ```

3. **Salvar o arquivo** - As mudanças serão aplicadas automaticamente

## Como Remover Vídeos

Simplesmente remova o objeto do vídeo da array `videos` no arquivo JSON.

## Como Reordenar Vídeos

Reordene os objetos na array `videos` na ordem desejada.

## Funcionalidades

### ✅ Implementado
- Lista configurável de vídeos
- Suporte a vídeos normais e shorts
- Títulos e descrições personalizáveis
- Busca automática de informações do YouTube (duração, visualizações, etc.)
- Fallback para dados mockados se a API falhar
- Interface responsiva
- Loading states
- Badge especial para shorts

### 🔄 Fallback
Se a API do YouTube não estiver disponível ou falhar, o sistema usa dados mockados baseados na configuração.

## Exemplo de Uso

```tsx
import YouTubeConfigurable from './youtube-configurable';

// Usar com configuração padrão
<YouTubeConfigurable />

// Usar com número específico de vídeos
<YouTubeConfigurable maxResults={5} />
```

## Vantagens

1. **Fácil manutenção**: Não precisa mexer no código para alterar vídeos
2. **Flexibilidade**: Pode personalizar títulos e descrições
3. **Performance**: Busca apenas os vídeos especificados
4. **Confiabilidade**: Fallback automático em caso de erro
5. **Tipos mistos**: Suporte a vídeos normais e shorts na mesma lista

## Troubleshooting

### Vídeos não aparecem
1. Verifique se o ID do vídeo está correto
2. Verifique se a URL está formatada corretamente
3. Verifique se o arquivo JSON está válido
4. Verifique os logs do console para erros

### API do YouTube não funciona
- O sistema automaticamente usa dados mockados
- Verifique se a `YOUTUBE_API_KEY` está configurada no `.env.local`

### Vídeos não carregam
- Verifique se os IDs dos vídeos existem no YouTube
- Verifique se os vídeos não são privados ou removidos
