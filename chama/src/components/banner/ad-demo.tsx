'use client';

import GoogleAd from './google-ads';

export default function AdDemo() {
    return (
        <div className="space-y-8 p-4">
            <h2 className="text-2xl font-bold text-center mb-6">Demonstração dos Anúncios com Janela</h2>
            
            {/* Janela Pequena */}
            <div className="space-y-2">
                <h3 className="text-lg font-semibold">Janela Pequena</h3>
                <GoogleAd windowSize="small" className="my-4" />
            </div>

            {/* Janela Média */}
            <div className="space-y-2">
                <h3 className="text-lg font-semibold">Janela Média</h3>
                <GoogleAd windowSize="medium" className="my-4" />
            </div>

            {/* Janela Grande */}
            <div className="space-y-2">
                <h3 className="text-lg font-semibold">Janela Grande</h3>
                <GoogleAd windowSize="large" className="my-4" />
            </div>

            {/* Múltiplas janelas */}
            <div className="space-y-2">
                <h3 className="text-lg font-semibold">Múltiplas Janelas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <GoogleAd windowSize="small" />
                    <GoogleAd windowSize="medium" />
                </div>
            </div>
        </div>
    );
} 