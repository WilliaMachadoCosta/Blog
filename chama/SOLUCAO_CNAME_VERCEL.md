# Solução para Problema de CNAME com WordPress e Vercel

## Problema Identificado
Você está enfrentando páginas vazias porque o CNAME está apontando para o Vercel, mas o WordPress no hostgator ainda está tentando processar as requisições, causando conflitos. O Vercel será responsável apenas pelo front-end, enquanto o WordPress no hostgator servirá apenas como backend/API.

## Soluções Implementadas

### 1. Configuração do Next.js (já aplicada)
O arquivo `next.config.ts` foi atualizado com:
- **Rewrites**: Redirecionam apenas a API e arquivos de mídia do WordPress para o hostgator
- **Headers**: Configurações de segurança para evitar conflitos

### 2. Middleware (já aplicado)
O arquivo `middleware.ts` foi criado para:
- Controlar quais rotas da API vão para o WordPress
- Controlar quais rotas ficam no Vercel (front-end)
- Evitar conflitos entre os dois sistemas

### 3. Melhorias no Serviço de Posts (já aplicadas)
O arquivo `src/services/postServices.ts` foi melhorado com:
- **Retry Logic**: Tenta novamente em caso de falhas
- **Timeout aumentado**: 15 segundos em vez de 10
- **Headers melhorados**: Para melhor compatibilidade
- **Backoff exponencial**: Espera progressiva entre tentativas

## Passos para Aplicar no Hostgator

### Passo 1: Acessar o WordPress no Hostgator
1. Acesse o painel do hostgator
2. Vá para o File Manager
3. Navegue até a raiz do seu WordPress (geralmente `public_html`)

### Passo 2: Fazer Backup do .htaccess Atual
1. Encontre o arquivo `.htaccess`
2. Faça uma cópia de backup (renomeie para `.htaccess.backup`)

### Passo 3: Substituir o .htaccess
1. Abra o arquivo `htaccess-wordpress-hostgator.txt` que foi criado
2. Copie todo o conteúdo
3. Substitua o conteúdo do `.htaccess` no hostgator pelo conteúdo do arquivo

### Passo 4: Verificar Permissões
1. Certifique-se que o `.htaccess` tem permissão 644
2. Se necessário, ajuste as permissões no File Manager

## Testando a Solução

### 1. Teste as Rotas da API do WordPress
Acesse estas URLs para verificar se a API do WordPress funciona:
- `https://chamanozap.net/wp-json/wp/v2/posts`
- `https://chamanozap.net/wp-json/wp/v2/categories`

### 2. Teste as Rotas do Vercel
Acesse estas URLs para verificar se o Vercel está funcionando:
- `https://chamanozap.net/` (página inicial)
- `https://chamanozap.net/blog` (página do blog)
- `https://chamanozap.net/categorias` (página de categorias)

### 3. Teste a API
Verifique se a API do WordPress está respondendo:
```bash
curl https://chamanozap.net/wp-json/wp/v2/posts
```

## Configuração de DNS (Verificar)

### No Hostgator:
1. Acesse o painel de controle
2. Vá para "DNS Zone Editor"
3. Verifique se o CNAME está configurado corretamente:
   - **Name**: @ (ou deixe em branco para o domínio principal)
   - **Points to**: `cname.vercel-dns.com` (ou o domínio fornecido pelo Vercel)
   - **TTL**: 300 (ou 3600)

### No Vercel:
1. Acesse o dashboard do Vercel
2. Vá para o projeto
3. Clique em "Settings" > "Domains"
4. Adicione `chamanozap.net` como domínio personalizado
5. Configure o domínio conforme as instruções do Vercel

## Troubleshooting

### Se ainda houver páginas vazias:

1. **Verificar logs do Vercel**:
   - Acesse o dashboard do Vercel
   - Vá para "Functions" > "Logs"
   - Procure por erros relacionados ao WordPress

2. **Verificar logs do hostgator**:
   - Acesse o painel do hostgator
   - Vá para "Error Logs"
   - Procure por erros relacionados ao WordPress

3. **Testar conectividade**:
   ```bash
   # Testar se o WordPress responde
   curl -I https://chamanozap.net/wp-json/wp/v2/posts
   
   # Testar se o Vercel responde
   curl -I https://chamanozap.net/
   ```

### Se a API não estiver funcionando:

1. **Verificar se o WordPress está ativo**:
   - Acesse `https://chamanozap.net/wp-admin/` (diretamente no hostgator)
   - Verifique se consegue fazer login

2. **Verificar se a API REST está habilitada**:
   - No WordPress Admin, vá para "Settings" > "Permalinks"
   - Salve novamente (isso regenera as regras de rewrite)

3. **Verificar plugins de segurança**:
   - Desative temporariamente plugins de segurança
   - Teste a API novamente
   - Reative os plugins um por um

## Configurações Adicionais Recomendadas

### 1. Cache no Vercel
O Next.js já está configurado com cache de 5 minutos para a API do WordPress.

### 2. Monitoramento
Considere adicionar monitoramento para:
- Disponibilidade da API do WordPress
- Performance das requisições
- Erros de conectividade

### 3. Fallback
Se necessário, você pode implementar um sistema de fallback que usa dados locais quando a API do WordPress não estiver disponível.

## Contato para Suporte

Se ainda houver problemas após aplicar todas essas soluções:
1. Verifique os logs de erro
2. Teste cada componente individualmente
3. Considere usar um subdomínio para o WordPress (ex: `api.chamanozap.net`)

## Resumo das Mudanças

✅ **Next.js configurado** com rewrites apenas para API e mídia
✅ **Middleware criado** para controle de rotas da API
✅ **Serviço de posts melhorado** com retry logic
✅ **Arquivo .htaccess** preparado para o hostgator (sem admin)
✅ **Documentação completa** criada

**Arquitetura Final:**
- **Vercel**: Front-end (páginas, componentes, interface)
- **Hostgator**: Backend/API (WordPress como CMS headless)

Agora você precisa apenas aplicar o arquivo `.htaccess` no hostgator e testar! 