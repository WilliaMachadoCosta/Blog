# Configuração de Posts de Empresas no WordPress

## Como configurar posts de empresas para aparecerem na lista

### 1. Criar Categoria "Empresas"
No WordPress Admin:
1. Vá para **Posts > Categorias**
2. Crie uma nova categoria chamada "Empresas"
3. Anote o ID da categoria (aparece na URL quando você edita a categoria)

### 2. Criar Posts de Empresas
Para cada empresa, crie um post com:

**Título:** Nome da empresa (ex: "Azul Linhas Aéreas")

**Conteúdo:** 
```html
<h2>Sobre a Azul</h2>
<p>A Azul Linhas Aéreas Brasileiras é uma das principais companhias aéreas do Brasil...</p>

<h3>Como Entrar em Contato</h3>
<p>Estamos sempre disponíveis para atender você:</p>

<custom-button data-label="WhatsApp Azul" data-href="https://wa.me/1140042985" data-variant="whatsapp"></custom-button>
<custom-button data-label="Telefone Azul" data-href="tel:40031118" data-variant="sac"></custom-button>
<custom-button data-label="Site Oficial" data-href="https://www.voeazul.com.br" data-variant="default"></custom-button>
```

**Imagem Destacada:** Logo da empresa

**Categoria:** Selecione "Empresas"

**Autor:** Nome da empresa (ex: "Equipe Azul")

### 3. Estrutura do Post de Empresa

Cada post de empresa deve conter:

1. **Título atrativo** com o nome da empresa
2. **Resumo (excerpt)** explicando o que a empresa faz
3. **Conteúdo rico** com informações sobre a empresa
4. **Botões de contato** usando o componente `<custom-button>`
5. **Imagem destacada** (logo da empresa)
6. **Categoria "Empresas"** para identificação

### 4. Botões de Contato Disponíveis

Use estes tipos de botões no conteúdo:

```html
<!-- WhatsApp -->
<custom-button data-label="WhatsApp [Empresa]" data-href="https://wa.me/NUMERO" data-variant="whatsapp"></custom-button>

<!-- Telefone/SAC -->
<custom-button data-label="Telefone [Empresa]" data-href="tel:NUMERO" data-variant="sac"></custom-button>

<!-- Site -->
<custom-button data-label="Site [Empresa]" data-href="URL_DO_SITE" data-variant="default"></custom-button>

<!-- Central de Atendimento -->
<custom-button data-label="Central [Empresa]" data-href="tel:NUMERO" data-variant="central"></custom-button>
```

### 5. Exemplo Completo de Post

**Título:** GOL Linhas Aéreas - Voando alto com você

**Resumo:** A GOL é uma das maiores companhias aéreas de baixo custo do Brasil, oferecendo voos acessíveis para diversos destinos.

**Conteúdo:**
```html
<h2>Sobre a GOL</h2>
<p>A GOL Linhas Aéreas é uma das principais companhias aéreas de baixo custo do Brasil, fundada em 2001. Com foco em eficiência e preços acessíveis, a GOL conecta milhões de passageiros anualmente.</p>

<h3>Nossos Valores</h3>
<ul>
<li>Preços acessíveis</li>
<li>Eficiência operacional</li>
<li>Segurança em primeiro lugar</li>
<li>Atendimento ao cliente</li>
<li>Inovação constante</li>
</ul>

<h3>Entre em Contato</h3>
<p>Nossa equipe está pronta para ajudar você:</p>

<custom-button data-label="WhatsApp GOL" data-href="https://wa.me/1140042985" data-variant="whatsapp"></custom-button>
<custom-button data-label="Central de Atendimento" data-href="tel:40031118" data-variant="central"></custom-button>
<custom-button data-label="Visitar Site" data-href="https://www.voegol.com.br" data-variant="default"></custom-button>
```

### 6. Resultado Final

Com essa configuração, os posts de empresas aparecerão:
- Na lista principal junto com posts normais
- Com layout padronizado de posts
- Com botões de contato funcionais
- Com imagem da empresa como destaque
- Identificados como posts de empresa

### 7. Empresas Sugeridas

- Azul Linhas Aéreas
- GOL Linhas Aéreas  
- LATAM Airlines
- Viação Cometa
- São Paulo Transportes
- Avianca
- Outras empresas de transporte 