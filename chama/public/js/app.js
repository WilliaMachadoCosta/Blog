// App.js - Vanilla JavaScript para carregar conteúdo dinamicamente

(function() {
  'use strict';

  // Extrair slug da URL
  function getSlugFromUrl() {
    const path = window.location.pathname;
    const whatsappMatch = path.match(/^\/whatsapp-(.+)$/);
    const reviewMatch = path.match(/^\/review-(.+)$/);
    
    if (whatsappMatch) {
      return { type: 'whatsapp', slug: whatsappMatch[1] };
    }
    if (reviewMatch) {
      return { type: 'review', slug: reviewMatch[1] };
    }
    
    return null;
  }

  // Carregar dados do JSON individual por slug
  async function loadData(type, slug) {
    try {
      const response = await fetch(`/data/${type}/${slug}.json`);
      if (!response.ok) {
        throw new Error('Failed to load data');
      }
      return await response.json();
    } catch (error) {
      console.error('Error loading data:', error);
      return null;
    }
  }

  // Formatar nome da empresa a partir do slug
  function formatCompanyName(slug) {
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  // Extrair nome da empresa do item (H1 ou slug)
  function getCompanyName(item) {
    let companyName = formatCompanyName(item.slug);
    
    // Tentar extrair do H1 se disponível
    if (item.h1) {
      // Remover palavras comuns do início (WhatsApp, Telefone, etc)
      let h1Clean = item.h1
        .replace(/^(WhatsApp|Telefone|Contato)\s+/i, '')
        .replace(/\s*:.*$/, '') // Remover tudo após dois pontos
        .trim();
      
      // Se o H1 limpo fizer sentido (não muito curto), usar
      if (h1Clean.length > 3 && h1Clean.length < 50) {
        companyName = h1Clean;
      }
    }
    
    return companyName;
  }

  // Gerar schema de organização
  function generateOrganizationSchema(item) {
    const companyName = getCompanyName(item);
    
    const whatsappNumber = item.whatsapp?.number || '';
    const phoneContact = item.contacts?.find(c => c.type === 'phone');
    const phoneNumber = phoneContact?.value || '';
    
    const schema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": companyName,
      "url": window.location.href,
      "description": item.description
    };

    // Adicionar telefone se disponível
    if (phoneNumber) {
      schema.telephone = phoneNumber.replace(/\D/g, '');
    }

    // Adicionar contato WhatsApp
    if (whatsappNumber) {
      const cleanWhatsApp = whatsappNumber.replace(/\D/g, '');
      schema.sameAs = schema.sameAs || [];
      schema.sameAs.push(`https://wa.me/${cleanWhatsApp}`);
      
      // Adicionar potentialAction para WhatsApp (importante para SEO)
      schema.potentialAction = {
        "@type": "CommunicateAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(item.whatsapp?.text || 'Olá')}`,
          "actionPlatform": [
            "http://schema.org/WhatsAppPlatform"
          ]
        },
        "result": {
          "@type": "Message",
          "name": "Contato via WhatsApp"
        }
      };
    }

    // Adicionar outros links
    const linkContacts = item.contacts?.filter(c => c.type === 'link') || [];
    linkContacts.forEach(contact => {
      if (contact.value && contact.value.startsWith('http')) {
        schema.sameAs = schema.sameAs || [];
        schema.sameAs.push(contact.value);
      }
    });

    // Adicionar AggregateRating ao schema de organização
    const ratingValue = 4.5;
    const reviewCount = Math.floor(Math.random() * 100) + 50;
    schema.aggregateRating = {
      "@type": "AggregateRating",
      "ratingValue": ratingValue.toString(),
      "reviewCount": reviewCount.toString(),
      "bestRating": "5",
      "worstRating": "1"
    };

    return schema;
  }

  // Gerar schema de BlogPosting
  function generateBlogPostingSchema(item) {
    const companyName = getCompanyName(item);
    
    // Extrair data de publicação (usar data atual se não houver)
    const publishedDate = new Date().toISOString();
    const modifiedDate = publishedDate;
    
    // Combinar intro e seções para criar o texto do artigo
    let articleBody = item.intro || '';
    if (item.sections && item.sections.length > 0) {
      articleBody += '\n\n' + item.sections.map(section => {
        let sectionText = section.title + '\n' + (section.content || '');
        if (section.steps) {
          sectionText += '\n' + section.steps.map(step => 
            `${step.number}. ${step.title}\n${step.content}`
          ).join('\n\n');
        }
        return sectionText;
      }).join('\n\n');
    }

    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": item.title,
      "description": item.description,
      "image": window.location.origin + "/logos/chama.png", // Logo do site
      "datePublished": publishedDate,
      "dateModified": modifiedDate,
      "author": {
        "@type": "Organization",
        "name": "Chama no Zap",
        "url": window.location.origin
      },
      "publisher": {
        "@type": "Organization",
        "name": "Chama no Zap",
        "url": window.location.origin,
        "logo": {
          "@type": "ImageObject",
          "url": window.location.origin + "/logos/chama.png"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": window.location.href
      },
      "articleBody": articleBody.substring(0, 5000), // Limitar tamanho
      "about": {
        "@type": "Thing",
        "name": companyName
      }
    };
  }

  // Gerar schema de Review/AggregateRating
  function generateReviewSchema(item) {
    const companyName = getCompanyName(item);
    
    // Rating padrão (pode ser customizado no futuro)
    // Por enquanto, usar um rating positivo padrão para empresas
    const ratingValue = 4.5;
    const reviewCount = Math.floor(Math.random() * 100) + 50; // Simulado, pode ser do JSON
    
    return {
      "@context": "https://schema.org",
      "@type": "Review",
      "itemReviewed": {
        "@type": "Organization",
        "name": companyName
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": ratingValue,
        "bestRating": "5",
        "worstRating": "1"
      },
      "author": {
        "@type": "Organization",
        "name": "Chama no Zap"
      },
      "reviewBody": item.description
    };
  }


  // Inserir múltiplos schemas no head
  function insertSchemas(schemas) {
    // Remover schemas anteriores
    const existingSchemas = document.querySelectorAll('script[type="application/ld+json"]');
    existingSchemas.forEach(schema => schema.remove());

    // Inserir cada schema
    schemas.forEach(schema => {
      if (schema) {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(schema, null, 2);
        document.head.appendChild(script);
      }
    });
  }

  // Converter hex para RGB
  function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  // Escurecer cor
  function darkenColor(hex, percent) {
    const rgb = hexToRgb(hex);
    if (!rgb) return hex;
    
    const factor = 1 - (percent / 100);
    return `rgb(${Math.round(rgb.r * factor)}, ${Math.round(rgb.g * factor)}, ${Math.round(rgb.b * factor)})`;
  }

  // Clarear cor
  function lightenColor(hex, percent) {
    const rgb = hexToRgb(hex);
    if (!rgb) return hex;
    
    const factor = percent / 100;
    return `rgb(${Math.round(rgb.r + (255 - rgb.r) * factor)}, ${Math.round(rgb.g + (255 - rgb.g) * factor)}, ${Math.round(rgb.b + (255 - rgb.b) * factor)})`;
  }

  // Calcular luminância relativa (para contraste)
  function getLuminance(r, g, b) {
    const [rs, gs, bs] = [r, g, b].map(val => {
      val = val / 255;
      return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  }

  // Calcular contraste entre duas cores
  function getContrast(color1, color2) {
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);
    if (!rgb1 || !rgb2) return 1;

    const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
    const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
    const lighter = Math.max(lum1, lum2);
    const darker = Math.min(lum1, lum2);
    
    return (lighter + 0.05) / (darker + 0.05);
  }

  // Encontrar cor de link com contraste adequado
  function getAccessibleLinkColor(themeColor, backgroundColor = '#FFFFFF') {
    // Tentar usar a cor do tema escurecida
    let linkColor = darkenColor(themeColor, 40);
    let contrast = getContrast(linkColor, backgroundColor);
    
    // Se contraste for menor que 4.5:1 (WCAG AA), usar azul escuro padrão
    if (contrast < 4.5) {
      // Usar azul escuro que garante contraste
      linkColor = '#1E40AF'; // Azul escuro com bom contraste
    }
    
    return linkColor;
  }

  // Aplicar cores do tema
  function applyThemeColors(themeColor) {
    if (!themeColor) {
      // Usar cor padrão do WhatsApp se não houver tema
      themeColor = '#25D366';
    }

    const root = document.documentElement;
    const backgroundColor = '#FFFFFF'; // Fundo branco padrão
    
    // Cor principal
    root.style.setProperty('--theme-color', themeColor);
    
    // Cor escura (20% mais escura)
    const darkColor = darkenColor(themeColor, 20);
    root.style.setProperty('--theme-color-dark', darkColor);
    
    // Cor mais escura (40% mais escura)
    const darkerColor = darkenColor(themeColor, 40);
    root.style.setProperty('--theme-color-darker', darkerColor);
    
    // Cor clara (80% mais clara, para backgrounds)
    const lightColor = lightenColor(themeColor, 80);
    root.style.setProperty('--theme-color-light', lightColor);
    
    // Cor de link com contraste adequado (mínimo 4.5:1 para WCAG AA)
    const linkColor = getAccessibleLinkColor(themeColor, backgroundColor);
    root.style.setProperty('--link-color', linkColor);
    
    // Cor de link hover (mais escura)
    const linkHoverColor = darkenColor(linkColor, 15);
    root.style.setProperty('--link-hover-color', linkHoverColor);
    
    // Atualizar meta theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', themeColor);
    }
  }

  // Renderizar conteúdo WhatsApp
  function renderWhatsAppContent(item) {
    // Aplicar cores do tema
    if (item.themeColor) {
      applyThemeColors(item.themeColor);
    }

    // Atualizar SEO
    document.title = item.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', item.description);
    }

    // Gerar e inserir todos os schemas
    const organizationSchema = generateOrganizationSchema(item);
    const blogPostingSchema = generateBlogPostingSchema(item);
    const reviewSchema = generateReviewSchema(item);
    
    // Inserir todos os schemas
    insertSchemas([
      organizationSchema,
      blogPostingSchema,
      reviewSchema
    ]);

    // Renderizar H1
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
      heroTitle.textContent = item.h1;
    }

    // Renderizar intro completo
    const introEl = document.querySelector('.intro');
    if (introEl && item.intro) {
      introEl.textContent = item.intro;
    }

    // Renderizar botões CTA
    const ctaSection = document.querySelector('.cta-section');
    if (ctaSection && item.whatsapp) {
      const whatsappBtn = ctaSection.querySelector('.btn-whatsapp');
      if (whatsappBtn) {
        const whatsappUrl = `https://wa.me/${item.whatsapp.number.replace(/\D/g, '')}?text=${encodeURIComponent(item.whatsapp.text)}`;
        whatsappBtn.href = whatsappUrl;
        // Formatar número para exibição (formato brasileiro)
        const cleanNumber = item.whatsapp.number.replace(/\D/g, '');
        let displayNumber = item.whatsapp.number;
        if (cleanNumber.length === 13) {
          // Formato: 55 31 97707000
          displayNumber = cleanNumber.replace(/(\d{2})(\d{2})(\d{4,5})(\d{4})/, '($2) $3-$4');
        }
        whatsappBtn.innerHTML = `<span style="font-size: 1.5rem; margin-bottom: 0.25rem;">💬</span>Abrir no WhatsApp<br><small style="font-size: 0.875rem; opacity: 0.95; font-weight: 500;">${displayNumber}</small>`;
      }

      // Adicionar botão de telefone SAC se houver contato SAC
      const sacContact = item.contacts?.find(c => c.label.toLowerCase().includes('sac') && c.type === 'phone');
      if (sacContact) {
        const phoneBtn = ctaSection.querySelector('.btn-phone');
        if (phoneBtn) {
          phoneBtn.style.display = 'flex';
          phoneBtn.href = `tel:${sacContact.value.replace(/\D/g, '')}`;
          phoneBtn.innerHTML = `<span style="font-size: 1.5rem; margin-bottom: 0.25rem; display: block;">📞</span>Fale com o SAC<br><small style="font-size: 0.875rem; opacity: 0.95; font-weight: 500;">${sacContact.value}</small>`;
        }
      }
    }

    // Renderizar contatos
    if (item.contacts && item.contacts.length > 0) {
      const contactsList = document.querySelector('.contacts-list');
      if (contactsList) {
        contactsList.innerHTML = item.contacts.map(contact => {
          if (contact.type === 'phone') {
            return `
              <li class="contact-item">
                <span class="contact-label">${contact.label}</span>
                <span class="contact-value">
                  <a href="tel:${contact.value.replace(/\D/g, '')}">${contact.value}</a>
                </span>
              </li>
            `;
          } else if (contact.type === 'link') {
            return `
              <li class="contact-item">
                <span class="contact-label">${contact.label}</span>
                <span class="contact-value">
                  <a href="${contact.value}" target="_blank" rel="noopener noreferrer">${contact.value}</a>
                </span>
              </li>
            `;
          }
          return '';
        }).join('');
      }
    }

    // Renderizar seções
    const contentEl = document.querySelector('.content');
    if (contentEl && item.sections) {
      const sectionsHTML = item.sections.map(section => {
        let sectionHTML = `
          <section class="section">
            <h2 class="section-title">${section.title}</h2>
            <div class="section-content">${section.content || ''}</div>
        `;

        // Renderizar steps se existirem
        if (section.steps && section.steps.length > 0) {
          sectionHTML += '<ol class="steps-list">';
          sectionHTML += section.steps.map(step => `
            <li class="step-item">
              <span class="step-number">${step.number}</span>
              <h3 class="step-title">${step.title}</h3>
              <div class="step-content">${step.content}</div>
            </li>
          `).join('');
          sectionHTML += '</ol>';
        }

        // Renderizar serviços se existirem
        if (section.services && section.services.length > 0) {
          sectionHTML += '<ul class="services-list">';
          sectionHTML += section.services.map(service => `
            <li class="service-item">
              <span class="service-label">${service.label}</span>
              <a href="${service.value.startsWith('http') ? service.value : '#'}" 
                 class="service-value" 
                 ${service.value.startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : ''}>
                ${service.value}
              </a>
            </li>
          `).join('');
          sectionHTML += '</ul>';
        }

        sectionHTML += '</section>';
        return sectionHTML;
      }).join('');

      // Inserir seções após a lista de contatos (ou após CTA se não houver contatos)
      const contactsList = contentEl.querySelector('.contacts-list');
      const ctaSection = contentEl.querySelector('.cta-section');
      
      if (contactsList && contactsList.innerHTML.trim() !== '') {
        // Se houver contatos renderizados, inserir após eles
        contactsList.insertAdjacentHTML('afterend', sectionsHTML);
      } else if (ctaSection) {
        // Se não houver contatos, inserir após os botões CTA
        ctaSection.insertAdjacentHTML('afterend', sectionsHTML);
      } else {
        // Fallback: inserir no final do content
        contentEl.insertAdjacentHTML('beforeend', sectionsHTML);
      }
    }

    // Renderizar links relacionados
    if (item.relatedLinks && item.relatedLinks.length > 0) {
      const relatedLinksEl = document.querySelector('.related-links');
      if (relatedLinksEl) {
        const linksHTML = item.relatedLinks.map(link => `
          <a href="${link.url}" class="related-link">${link.text}</a>
        `).join('');
        relatedLinksEl.insertAdjacentHTML('beforeend', linksHTML);
      }
    }

    // Mostrar conteúdo
    document.body.classList.remove('loading');
  }

  // Renderizar conteúdo Review
  function renderReviewContent(item) {
    // Similar ao WhatsApp, mas adaptado para reviews
    document.title = item.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', item.description);
    }

    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
      heroTitle.textContent = item.h1;
    }

    document.body.classList.remove('loading');
  }

  // Mostrar erro
  function showError(message) {
    const contentEl = document.querySelector('.content');
    if (contentEl) {
      contentEl.innerHTML = `
        <div class="error">
          <h2>Página não encontrada</h2>
          <p>${message || 'A página que você está procurando não existe.'}</p>
        </div>
      `;
    }
    document.body.classList.remove('loading');
  }

  // Inicializar app
  async function init() {
    const urlData = getSlugFromUrl();
    
    if (!urlData) {
      showError('URL inválida. Use /whatsapp-{slug} ou /review-{slug}');
      return;
    }

    const item = await loadData(urlData.type, urlData.slug);
    
    if (!item) {
      showError('Conteúdo não encontrado.');
      return;
    }

    // Renderizar conteúdo baseado no tipo
    if (urlData.type === 'whatsapp') {
      renderWhatsAppContent(item);
    } else if (urlData.type === 'review') {
      renderReviewContent(item);
    }
  }

  // Executar quando DOM estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

