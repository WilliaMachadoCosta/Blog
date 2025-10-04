'use client';

import { useRef, useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Download, Copy, Check, Share2 } from 'lucide-react';

import { exportCardImage } from '@/utils/exportTweetCard';
import GoogleAd from '../banner/google-ads';
import { MensagemData } from '@/types/mensagem-data';

interface GeradorMensagemGenericoProps {
    data: MensagemData;
    fileName?: string; // Nome do arquivo para download (opcional)
}


export default function GeradorMensagemGenerico({ data, fileName = "mensagem" }: GeradorMensagemGenericoProps) {
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const [coresCartoes, setCoresCartoes] = useState<string[]>([]);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    // Cores padrão caso não sejam fornecidas
    const coresFundoMensagem = data.coresFundo || [
        '#EF4444', '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#F43F5E'
    ];

    useEffect(() => {
        const coresSorteadas = data.mensagens.map(
            () => coresFundoMensagem[Math.floor(Math.random() * coresFundoMensagem.length)]
        );
        setCoresCartoes(coresSorteadas);
    }, [data.mensagens, coresFundoMensagem]);

    const handleCopy = async (text: string, index: number) => {
        await navigator.clipboard.writeText(`${text}\n\nvia chamanozap.net`);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    const handleDownload = async (index: number) => {
        const card = cardRefs.current[index];
        if (!card) return;

        const botoes = card.querySelector('.botoes-acao') as HTMLElement | null;

        // Oculta os botões temporariamente
        if (botoes) botoes.style.display = 'none';

        await exportCardImage(card, `${fileName}-${index + 1}.png`);

        // Reexibe os botões
        if (botoes) botoes.style.display = '';
    };

    const handleShare = (mensagem: string) => {
        const texto = `${mensagem}\n\nvia chamanozap.net`;
        const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(texto)}`;
        window.open(url, '_blank');
    };

    return (
        <>
            <Head>
                <title>{data.seo.title}</title>
                <meta name="description" content={data.seo.description} />

                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content={data.seo.ogTitle} />
                <meta property="og:description" content={data.seo.ogDescription} />
                <meta property="og:image" content={data.seo.ogImage} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:url" content={data.seo.url} />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={data.seo.ogTitle} />
                <meta name="twitter:description" content={data.seo.ogDescription} />
                <meta name="twitter:image" content={data.seo.ogImage} />
            </Head>

            <main className="max-w-5xl mx-auto px-4 py-10">
                <h1 className="text-4xl font-extrabold text-green-700 mb-6 text-center">
                    {data.titulo}
                </h1>

                <p className="text-lg text-gray-700 mb-8 leading-relaxed text-center">
                    {data.descricao}
                </p>

                {/* Conteúdo */}
                <div className="my-6 max-w-2xl mx-auto w-full h-[200px] rounded-lg relative">
                    <div className="flex justify-center">
                        <GoogleAd className="my-9" />
                    </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {data.mensagens.map((mensagem, index) => (
                        <div
                            key={index}
                            ref={(el) => { cardRefs.current[index] = el; }}
                            className="bg-white rounded-xl border shadow hover:shadow-lg transition overflow-hidden"
                        >
                            <Image
                                src={data.imagens[index % data.imagens.length]}
                                alt={`Imagem para: ${mensagem.substring(0, 30)}...`}
                                width={500}
                                height={180}
                                priority={index < 3}
                                className="w-full h-[180px] object-cover rounded-t-xl"
                            />

                            <div
                                style={{ backgroundColor: coresCartoes[index] || '#10B981' }}
                                className="p-6 text-white text-center font-semibold min-h-[120px] flex flex-col justify-center"
                            >
                                <p className="whitespace-pre-line">{mensagem}</p>
                                <p className="text-xs mt-4 opacity-80 border-t border-white pt-2">conheça chamanozap.net</p>
                            </div>

                            <div className="botoes-acao flex gap-3 justify-center mt-3 mb-4 px-4">
                                <button
                                    onClick={() => handleCopy(mensagem, index)}
                                    className="bg-green-600 hover:bg-green-700 rounded px-3 py-1 text-sm flex items-center gap-1 text-white transition"
                                >
                                    {copiedIndex === index ? <><Check className="w-4 h-4" /> Copiado!</> : <><Copy className="w-4 h-4" /> Copiar</>}
                                </button>

                                <button
                                    onClick={() => handleDownload(index)}
                                    className="bg-blue-600 hover:bg-blue-700 rounded px-3 py-1 text-sm flex items-center gap-1 text-white transition"
                                >
                                    <Download className="w-4 h-4" /> Baixar
                                </button>

                                <button
                                    onClick={() => handleShare(mensagem)}
                                    className="bg-green-600 hover:bg-green-700 rounded px-3 py-1 text-sm flex items-center gap-1 text-white transition"
                                >
                                    <Share2 className="w-4 h-4" /> WhatsApp
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <GoogleAd className="my-8" />

                {/* Seções informativas */}
                <hr className="my-12 border-gray-300" />
                <InfoSection data={data} />
            </main>
        </>
    );
}

// Componente extraído para organização
function InfoSection({ data }: { data: MensagemData }) {
    return (
        <>
            {data.infoSection && (
                <section>
                    <h2 className="text-3xl font-bold text-green-600 mb-6 text-center">{data.infoSection.titulo}</h2>
                    {data.infoSection.paragrafos.map((paragrafo, index) => (
                        <p key={index} className="text-gray-600 mb-4 text-justify">
                            {paragrafo}
                        </p>
                    ))}
                </section>
            )}

            {/* Conteúdo */}
            <div className="my-6 max-w-2xl mx-auto w-full h-[200px] rounded-lg relative">
                <div className="flex justify-center">
                    <GoogleAd className="my-9" />
                </div>
            </div>

            <hr className="my-12 border-gray-300" />

            {data.dicas && (
                <section>
                    <h2 className="text-3xl font-bold text-green-600 mb-6 text-center">{data.dicas.titulo}</h2>
                    <ul className="list-disc list-inside text-gray-600 mb-4 ml-4 space-y-1">
                        {data.dicas.lista.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </section>
            )}

            <hr className="my-12 border-gray-300" />

            {data.frasesOcasiao && (
                <section>
                    <h2 className="text-3xl font-bold text-green-600 mb-6 text-center">{data.frasesOcasiao.titulo}</h2>
                    {data.frasesOcasiao.paragrafos.map((paragrafo, index) => (
                        <p key={index} className="text-gray-600 mb-4 text-justify">
                            {paragrafo}
                        </p>
                    ))}
                </section>
            )}
        </>
    );
}
