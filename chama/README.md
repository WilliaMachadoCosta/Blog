# Chama no Zap

Site estático de alta escala (800+ páginas) focado em:
- Experiência mobile-first com design app-like
- Alta performance e carregamento rápido
- SEO e monetização Google AdSense
- Páginas de contato WhatsApp e reviews de produtos

## Stack

- **HTML** puro
- **CSS** vanilla
- **JavaScript** vanilla (sem frameworks)

## Estrutura do Projeto

```
chama/
├── pages/              # Templates HTML
│   ├── whatsapp.html  # Template para páginas WhatsApp
│   └── review.html    # Template para páginas de review
├── public/
│   ├── data/          # Dados JSON
│   │   ├── whatsapp.json
│   │   └── review.json
│   ├── css/
│   │   └── styles.css # Estilos principais
│   └── js/
│       └── app.js     # JavaScript para carregar conteúdo
└── README.md
```

## URLs Públicas

Todas as páginas públicas usam URLs planas com prefixos semânticos:

- `/whatsapp-{slug}` - Páginas de contato WhatsApp
- `/review-{slug}` - Páginas de review de produtos

**Exemplos:**
- `/whatsapp-expresso-guanabara`
- `/review-fogao-consul-5-bocas`

## Como Adicionar uma Nova Página

Para adicionar uma nova página, basta adicionar uma entrada no arquivo JSON correspondente:

### Página WhatsApp

Edite `public/data/whatsapp.json` e adicione um novo objeto:

```json
{
  "slug": "nome-da-empresa",
  "title": "Título da Página",
  "description": "Meta description para SEO",
  "h1": "H1 da página",
  "intro": "Texto introdutório...",
  "whatsapp": {
    "number": "5511999999999",
    "text": "Mensagem inicial"
  },
  "contacts": [...],
  "sections": [...]
}
```

### Página Review

Edite `public/data/review.json` seguindo estrutura similar.

## Configuração do Servidor

### Apache (.htaccess)

Crie um arquivo `.htaccess` na raiz:

```apache
RewriteEngine On

# Redirecionar /whatsapp-{slug} para /pages/whatsapp.html
RewriteRule ^whatsapp-(.+)$ /pages/whatsapp.html [L]

# Redirecionar /review-{slug} para /pages/review.html
RewriteRule ^review-(.+)$ /pages/review.html [L]

# Servir arquivos estáticos
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
```

### Nginx

Adicione ao seu `nginx.conf`:

```nginx
location ~ ^/whatsapp-(.+)$ {
    try_files /pages/whatsapp.html =404;
}

location ~ ^/review-(.+)$ {
    try_files /pages/review.html =404;
}
```

### Servidor de Desenvolvimento Local

Para testar localmente, você pode usar:

```bash
# Python
python -m http.server 8000

# Node.js (http-server)
npx http-server -p 8000

# PHP
php -S localhost:8000
```

**Nota:** Para URLs funcionarem corretamente em desenvolvimento, você precisará configurar o servidor para servir `/pages/whatsapp.html` quando a URL for `/whatsapp-*`.

## Regras do Projeto

- ✅ Apenas HTML, CSS e JavaScript vanilla
- ✅ Mobile-first obrigatório
- ✅ Botões CTA sempre acima da dobra no mobile
- ✅ Altura mínima de botões: 44px
- ✅ Cada página deve ter título, meta description e H1 únicos
- ✅ Performance crítica - sem bibliotecas pesadas
- ✅ Escalável para centenas de páginas

## Performance

- Sem dependências externas
- CSS e JS minificados em produção
- Imagens otimizadas
- Core Web Vitals otimizados

## SEO

- Títulos únicos por página
- Meta descriptions únicas
- Um H1 por página
- HTML semântico
- URLs limpas e descritivas
