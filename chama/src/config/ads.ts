// Configuração simplificada do Google AdSense
export const ADS_CONFIG = {
    AD_CLIENT: 'ca-pub-5074393689985715',
    AD_SLOT: '9365926617'
};

// Função simplificada para verificar se deve mostrar anúncios
export function shouldShowAds(): boolean {
    return process.env.NODE_ENV === 'production';
}

// Função simplificada para obter configuração
export function getAdConfig() {
    return {
        adClient: ADS_CONFIG.AD_CLIENT,
        adSlot: ADS_CONFIG.AD_SLOT
    };
} 