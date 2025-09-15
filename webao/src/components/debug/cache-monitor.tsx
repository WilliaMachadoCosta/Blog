'use client';

import { useState, useEffect } from 'react';
import { getCacheStatus, clearCache } from '@/services/postServices';

export default function CacheMonitor() {
    const [cacheStatus, setCacheStatus] = useState<any>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const updateStatus = () => {
            setCacheStatus(getCacheStatus());
        };

        updateStatus();
        const interval = setInterval(updateStatus, 5000); // Atualizar a cada 5 segundos

        return () => clearInterval(interval);
    }, []);

    if (!isVisible) {
        return (
            <button
                onClick={() => setIsVisible(true)}
                className="fixed bottom-4 right-4 bg-blue-500 text-white p-2 sm:p-3 rounded-full shadow-lg z-50 hover:bg-blue-600 transition-colors"
                title="Mostrar monitor de cache"
            >
                <span className="text-sm sm:text-base">🗄️</span>
            </button>
        );
    }

    return (
        <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg shadow-lg p-3 sm:p-4 z-50 w-64 sm:w-72 max-w-[calc(100vw-2rem)]">
            <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-sm sm:text-base">Cache Status</h3>
                <button
                    onClick={() => setIsVisible(false)}
                    className="text-gray-500 hover:text-gray-700 p-1"
                >
                    <span className="text-lg">✕</span>
                </button>
            </div>
            
            {cacheStatus && (
                <div className="text-xs sm:text-sm space-y-2">
                    <div className="flex justify-between items-center">
                        <span>Total:</span>
                        <span className="font-mono bg-gray-100 px-2 py-1 rounded">{cacheStatus.totalEntries}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span>Válidos:</span>
                        <span className="font-mono bg-green-100 text-green-700 px-2 py-1 rounded">{cacheStatus.validEntries}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span>Expirados:</span>
                        <span className="font-mono bg-red-100 text-red-700 px-2 py-1 rounded">{cacheStatus.expiredEntries}</span>
                    </div>
                </div>
            )}
            
            <div className="mt-4 space-y-2">
                <button
                    onClick={() => {
                        clearCache();
                        setCacheStatus(getCacheStatus());
                    }}
                    className="w-full bg-red-500 text-white text-xs sm:text-sm py-2 px-3 rounded hover:bg-red-600 transition-colors"
                >
                    Limpar Cache
                </button>
                
                <button
                    onClick={() => setIsVisible(false)}
                    className="w-full bg-gray-500 text-white text-xs sm:text-sm py-2 px-3 rounded hover:bg-gray-600 transition-colors"
                >
                    Fechar
                </button>
            </div>
        </div>
    );
} 