'use client';

import Head from 'next/head';
import TweetCard from '@/components/media/tweetcard';
import WebcamCapture from '@/components/media/webcam';
import { useRef, useState } from 'react';
import { Download } from 'lucide-react';
import { exportCardImage } from '@/utils/exportTweetCard';
import GoogleAd from '@/components/banner/google-ads';

export default function TweetCreatorClient() {
    const [autor, setAutor] = useState('');
    const [excerto, setExcerto] = useState('');
    const [imagemPost, setImagemPost] = useState('');
    const [avatar, setAvatar] = useState('');
    const [slug, setSlug] = useState('');
    const [usarCamera, setUsarCamera] = useState(false);
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    const imagemInputRef = useRef<HTMLInputElement>(null);
    const avatarInputRef = useRef<HTMLInputElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    const cta = `👉 Saiba mais em chamanozap.net`;

    const handleImageUpload = (
        e: React.ChangeEvent<HTMLInputElement>,
        setter: (data: string) => void
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setter(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleDownload = () => {
        if (cardRef.current) {
            exportCardImage(cardRef.current, 'chamanozap-tweet-card.png');
        }
    };

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <>
            <Head>
                <title>Gerador de Card de Post | Chamanozap</title>
                <meta
                    name="description"
                    content="Crie cards personalizados de post estilo tweet com avatar, imagem de fundo e texto. Ideal para compartilhar em redes sociais. Use câmera ou faça upload de imagem."
                />
                <meta property="og:title" content="Gerador de Card de Post | Chamanozap" />
                <meta
                    property="og:description"
                    content="Monte seu tweet estilizado com imagem, avatar e texto. Baixe o card pronto para postar nas redes!"
                />
                <meta property="og:url" content="https://chamanozap.net/ferramentas/post-tweet-card" />
                <meta property="og:type" content="website" />
            </Head>


            <section className="w-full max-w-2xl mx-auto mt-12 px-4loca">
                <article className="prose prose-neutral max-w-none mb-10">
                    <h1 className="text-black text-center py-2 mb-4 font-bold text-xl sm:text-2xl">
                        Gerador de Card de Post (Tweet Card)
                    </h1>


                    <p>
                        Crie facilmente um card de postagem no estilo de um tweet personalizado com nome, @,
                        imagem de fundo, avatar e o texto que quiser. Ideal para compartilhar conteúdo em grupos,
                        redes sociais, Instagram, WhatsApp ou Pinterest.
                    </p>


                    <GoogleAd />

                    <h2>Como funciona:</h2>
                    <ul>
                        <li>Digite o nome ou @ do autor</li>
                        <li>Escreva seu post ou recado</li>
                        <li>Escolha uma imagem de fundo ou deixe em branco</li>
                        <li>Escolha um avatar (ou use a câmera do dispositivo)</li>
                        <li>Visualize o card em tempo real</li>
                        <li>Clique no botão para baixar a imagem final</li>
                    </ul>
                    <p>
                        Não é necessário fazer login. Tudo acontece no seu navegador de forma rápida e prática. Experimente abaixo!
                    </p>

                    {/* Sugestões de mensagens */}
                    <div className="text-sm text-[#111B21]">
                        <h3 className="font-semibold mb-2">Sugestões de mensagens:</h3>
                        <ul className="list-disc list-inside space-y-1">
                            <li><a href="https://chamanozap.net/mensagem-de-aniversario-para-amigo-90-ideias-para-copiar-e-colar" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Mensagem de aniversário para amigo</a></li>
                            <li><a href="https://chamanozap.net/mensagem-de-deus-para-whatsapp-1" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Mensagem de Deus para WhatsApp</a></li>
                            <li><a href="https://chamanozap.net/mensagem-bom-dia-quinta-feira-motivacional" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Mensagem de bom dia - Quinta-feira</a></li>
                            <li><a href="https://chamanozap.net/mensagem-de-boa-noite-para-whatsapp" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Mensagem de boa noite</a></li>
                            <li><a href="https://chamanozap.net/as-melhores-mensagens-de-bom-dia-quinta-feira-abencoada-por-deus" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Bom dia quinta-feira abençoada</a></li>
                            <li><a href="https://chamanozap.net/sextou-frases-para-whatsapp" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Sextou! Frases para WhatsApp</a></li>
                            <li><a href="https://chamanozap.net/100-frases-para-recado-do-whatsapp-veja-as-melhores" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Frases para recado do WhatsApp</a></li>
                        </ul>
                    </div>
                </article>

                <div className="flex flex-col items-center gap-6">
                    <GoogleAd />

                    {/* Botão alternar tema */}
                    <button
                        onClick={toggleTheme}
                        className="self-end mb-2 px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-sm text-black transition"
                    >
                        Modo {theme === 'light' ? 'Escuro' : 'Claro'}
                    </button>

                    {/* Formulário */}
                    <div className="w-full rounded-xl shadow-md p-4 space-y-4 bg-white text-[#111B21] border border-[#D1D7DB]">
                        <input
                            type="text"
                            placeholder="Nome ou @"
                            value={autor}
                            onChange={(e) => setAutor(e.target.value)}
                            className="w-full rounded p-2 bg-[#F0F2F5] border border-[#D1D7DB] text-[#111B21]"
                        />
                        <textarea
                            placeholder="Escreva seu post"
                            value={excerto}
                            onChange={(e) => setExcerto(e.target.value)}
                            className="w-full rounded p-2 h-32 bg-[#F0F2F5] border border-[#D1D7DB] text-[#111B21]"
                        />

                        {/* Imagem do post */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium">Imagem do Post:</label>
                            <input
                                ref={imagemInputRef}
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e, setImagemPost)}
                                className="hidden"
                            />
                            <button
                                type="button"
                                onClick={() => imagemInputRef.current?.click()}
                                className="px-4 py-2 bg-[#1DA851] text-white rounded hover:bg-[#25D366] transition"
                            >
                                Selecionar Imagem
                            </button>
                        </div>

                        {/* Avatar */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium">Avatar:</label>
                            <button
                                onClick={() => setUsarCamera(!usarCamera)}
                                className="px-3 py-1 bg-[#EDEDED] hover:bg-[#D4D4D4] text-sm rounded text-[#111B21]"
                            >
                                {usarCamera ? 'Usar Upload' : 'Usar Câmera OU'}
                            </button>

                            {usarCamera ? (
                                <WebcamCapture onCapture={setAvatar} />
                            ) : (
                                <>
                                    <input
                                        ref={avatarInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleImageUpload(e, setAvatar)}
                                        className="hidden"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => avatarInputRef.current?.click()}
                                        className="px-4 py-2 bg-[#1DA851] hover:bg-[#25D366] text-white rounded transition"
                                    >
                                        Selecionar Avatar
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Card de visualização */}
                    <div ref={cardRef}>
                        <TweetCard
                            author={autor}
                            avatar={avatar}
                            excerto={excerto}
                            imagemPost={imagemPost}
                            cta={cta}
                            slug={slug}
                            theme={theme}
                        />
                    </div>

                    {/* Botão de download */}
                    <div className="flex gap-3 flex-wrap justify-center">
                        <button
                            onClick={handleDownload}
                            className="p-3 bg-[#25D366] hover:bg-[#1DA851] text-white rounded-full shadow-md transition"
                            title="Baixar imagem do Tweet"
                        >
                            <Download size={20} />
                        </button>
                    </div>
                </div>
            </section>

        </>
    );
}
