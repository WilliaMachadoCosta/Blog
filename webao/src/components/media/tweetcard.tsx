'use client';

interface TweetCardProps {
    author: string;
    avatar: string;
    excerto: string;
    imagemPost: string;
    cta: string;
    slug: string;
    theme: 'light' | 'dark';
}

export default function TweetCard({
    author,
    avatar,
    excerto,
    imagemPost,
    cta,
    slug,
    theme,
}: TweetCardProps) {
    const hoje = new Date().toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });

    const bgClass = theme === 'light' ? 'bg-white' : 'bg-gray-900';
    const textClass = theme === 'light' ? 'text-black' : 'text-white';
    const borderClass = theme === 'light' ? 'border-gray-200' : 'border-gray-700';
    const secondaryTextClass = theme === 'light' ? 'text-gray-500' : 'text-gray-400';
    const ctaClass =
        theme === 'light' ? 'text-blue-600 hover:text-blue-800' : 'text-blue-400 hover:text-blue-600';

    return (
        <div className="w-full flex flex-col items-center isolate">
            <div
                id="tweet-card"
                className={`relative  z-10 w-full max-w-xl p-6  shadow-lg font-sans space-y-4 border ${bgClass} ${textClass} ${borderClass}`}
            >
                {/* Cabeçalho com avatar e nome */}
                <div className="flex items-center gap-3">
                    <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-300 flex-shrink-0">
                        {avatar ? (
                            <img
                                src={avatar}
                                alt="Avatar"
                                className="w-full h-full object-cover"
                                crossOrigin="anonymous"
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-300" />
                        )}
                    </div>
                    <p className="font-semibold text-lg text-inherit">{author}</p>
                </div>

                {/* Texto principal */}
                <p className="text-base leading-relaxed whitespace-pre-line text-inherit">
                    {excerto}
                </p>

                {/* Imagem do post */}
                {imagemPost && (
                    <img
                        src={imagemPost}
                        alt="Imagem do post"
                        className="w-[300px] max-h-[300px] object-cover rounded-xl border border-gray-100 mx-auto"
                        crossOrigin="anonymous"
                    />
                )}

                {/* Link CTA */}
                <a
                    href={`https://webao.info/${slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`font-semibold block ${ctaClass} hover:underline`}
                >
                    {cta}
                </a>

                {/* Rodapé */}
                <div
                    className={`flex justify-between items-center text-xs pt-2 border-t ${borderClass} ${secondaryTextClass}`}
                >
                    <span>📅 {hoje}</span>
                    <span className="ml-auto">webao.info</span>
                </div>
            </div>
        </div>
    );
}
