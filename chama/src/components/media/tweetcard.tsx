'use client';

import Image from 'next/image';

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
    const hoje = new Date().toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });

    return (
        <div
            id="tweet-card"
            className="w-full max-w-xl p-6 bg-white rounded-2xl shadow-lg font-sans text-gray-900 border border-gray-200 space-y-4"
        >
            {/* Cabeçalho */}
            {/* Cabeçalho */}
            <div className="flex items-start justify-between w-full">
                <div className="flex items-center gap-3">
                    {avatar ? (
                        <img
                            src={avatar}
                            alt="Avatar"
                            className="w-12 h-12 object-cover rounded-full border border-gray-300"
                            style={{ aspectRatio: '1/1' }}
                        />
                    ) : (
                        <div className="w-12 h-12 rounded-full bg-gray-300" />
                    )}
                    <p className="font-semibold text-lg leading-tight">{author}</p>
                </div>
                <p className="text-gray-500 text-sm mt-1">@chamanozap</p>
            </div>



            {/* Texto principal */}
            <p className="text-gray-800 text-base leading-relaxed whitespace-pre-line">{excerto}</p>

            {/* Imagem do post */}
            {imagemPost && (
                <img
                    src={imagemPost}
                    alt="Imagem do post"
                    className="w-full h-[220px] object-cover rounded-xl border border-gray-100"
                />
            )}

            {/* Link CTA */}
            <a
                href={`https://chamanozap.net/${slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-semibold hover:underline block"
            >
                {cta}
            </a>

            {/* Rodapé */}
            <p className="text-gray-400 text-xs pt-2 border-t border-gray-100">
                📅 {hoje} · chamanozap.net
            </p>
        </div>
    );
}
