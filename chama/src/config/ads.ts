// Configurações dos anúncios do Google AdSense
export const ADS_CONFIG = {
    // ID do cliente AdSense
    AD_CLIENT: 'ca-pub-5074393689985715',
    
    // Slots de anúncios
    SLOTS: {
        // Anúncio horizontal principal
        HORIZONTAL_MAIN: '9365926617',
        
        // Anúncio vertical (sidebar)
        VERTICAL_SIDEBAR: '9365926617', // Você pode criar um slot específico para vertical
        
        // Anúncio entre posts
        BETWEEN_POSTS: '9365926617',
        
        // Anúncio no final da página
        FOOTER: '9365926617',
    },
    
    // Configurações de exibição
    DISPLAY: {
        // Máximo de anúncios por página
        MAX_ADS_PER_PAGE: 3,
        
        // Distância mínima entre anúncios (em pixels)
        MIN_DISTANCE_BETWEEN_ADS: 200,
        
        // Anúncios responsivos
        RESPONSIVE: true,
    }
};

// Função para verificar se os anúncios devem ser exibidos
export function shouldShowAds(): boolean {
    // Em desenvolvimento, desabilitar os anúncios para evitar problemas
    if (process.env.NODE_ENV === 'development') {
        return false;
    }
    
    // Verificar se estamos no servidor
    if (typeof window === 'undefined') {
        return false;
    }
    
    // Verificar se o usuário não está usando ad blocker (opcional)
    // Esta é uma verificação básica, não é 100% confiável
    if (window.navigator && window.navigator.userAgent) {
        const userAgent = window.navigator.userAgent.toLowerCase();
        if (userAgent.includes('adblock') || userAgent.includes('ublock')) {
            return false;
        }
    }
    
    // Verificar se há algum problema com o DOM
    if (document.body && document.body.children.length > 100) {
        // Se há muitos elementos, pode haver um problema
        return false;
    }
    
    return true;
}

// Função para obter configuração de anúncio específica
export function getAdConfig(type: keyof typeof ADS_CONFIG.SLOTS) {
    return {
        adClient: ADS_CONFIG.AD_CLIENT,
        adSlot: ADS_CONFIG.SLOTS[type],
        className: `ad-${type.toLowerCase()}`
    };
} 