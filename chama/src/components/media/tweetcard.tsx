'use client';

import { useState } from 'react';

interface TweetCardProps {
    author: string;
    avatar: string;
    excerto: string;
    imagemPost: string;
    cta: string;
    slug: string;
}

export default function TweetCard({
    author,
    avatar,
    excerto,
    imagemPost,
    cta,
    slug,
}: TweetCardProps) {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    const hoje = new Date().toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });

    // Alternar tema
    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    // Classes baseadas no tema
    const bgClass = theme === 'light' ? 'bg-white' : 'bg-gray-900';
    const textClass = theme === 'light' ? 'text-gray-900' : 'text-gray-100';
    const borderClass = theme === 'light' ? 'border-gray-200' : 'border-gray-700';
    const secondaryTextClass = theme === 'light' ? 'text-gray-500' : 'text-gray-400';
    const ctaClass = theme === 'light' ? 'text-blue-600 hover:text-blue-800' : 'text-blue-400 hover:text-blue-600';

    return (
        <div className={`w-full flex flex-col items-center space-y-4`}>
            {/* Botão fora do card */}
            <div className="flex justify-center w-full max-w-xl">
                <button
                    onClick={toggleTheme}
                    className="px-3 py-1 text-sm rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                    aria-label="Alternar tema claro/escuro"
                    type="button"
                >
                    {theme === 'light' ? 'Modo Escuro' : 'Modo Claro'}
                </button>
            </div>

            {/* Card */}
            <div
                id="tweet-card"
                className={`w-full max-w-xl p-6 rounded-2xl shadow-lg font-sans space-y-4 ${bgClass} ${textClass} border ${borderClass}`}
            >
                {/* Cabeçalho */}
                <div className="flex items-start justify-between w-full">
                    <div className="flex items-center gap-3">
                        {avatar ? (
                            <img
                                src={avatar}
                                alt="Avatar"
                                className="w-16 h-16 object-cover rounded-full border border-gray-300"
                                style={{ aspectRatio: '1/1' }}
                                crossOrigin="anonymous"
                            />
                        ) : (
                            <div className="w-12 h-12 rounded-full bg-gray-300" />
                        )}
                        <div className="flex flex-col leading-tight">
                            <div className="flex items-center gap-1">
                                <p className="font-semibold text-lg">{author}</p>
                            </div>
                            <p className={`${secondaryTextClass} text-sm ml-4`}>@chamanozap</p>
                        </div>
                    </div>
                    <p className={`${secondaryTextClass} text-sm mt-1`}>{hoje}</p>
                </div>

                {/* Texto principal */}
                <p className={`text-base leading-relaxed whitespace-pre-line ${theme === 'light' ? 'text-gray-800' : 'text-gray-300'}`}>
                    {excerto}
                </p>

                {/* Imagem do post */}
                {/* {imagemPost && (
                    <img
                        src={imagemPost}
                        alt="Imagem do post"
                        className="w-full h-[220px] object-cover rounded-xl border border-gray-100"
                    />
                )} */}

                {/* Link CTA */}
                <a
                    href={`https://chamanozap.net/${slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`font-semibold block ${ctaClass} hover:underline`}
                >
                    {cta}
                </a>

                {/* Rodapé */}
                <p className={`${secondaryTextClass} text-xs pt-2 border-t ${theme === 'light' ? 'border-gray-100' : 'border-gray-700'}`}>
                    📅 {hoje} · chamanozap.net
                </p>
            </div>
        </div>
    );
}