'use client';

import { useRef, useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Download, Copy, Check, Share2 } from 'lucide-react';

import { exportCardImage } from '@/utils/exportTweetCard';

// Frases de bom dia
const mensagens = [
    "🌞 Bom dia! Que sua manhã seja iluminada e cheia de paz!",
    "💖 Acorde com gratidão e espalhe amor por onde for. Bom dia!",
    "🙏 Que o seu dia comece com fé e termine com bênçãos.",
    "🌻 Bom dia! A vida te presenteou com mais uma chance de recomeçar.",
    "🙌 Deus abençoe sua manhã com alegria e serenidade.",
    "😊 Sorria, Deus te deu mais um dia lindo para viver!",
    "🌼 Bom dia com carinho, paz e muita esperança no coração.",
    "🌺 Que sua sexta-feira seja tão linda quanto o seu coração.",
    "☀️ Hoje é um novo dia! Acredite e vá em frente.",
    "✨ Bom dia! Nunca perca a fé nos seus sonhos.",
];

// URLs das imagens (deve configurar domínios no next.config.js se for externo)
const imagens = [
    'https://res.cloudinary.com/dengftv0a/image/upload/v1753447319/nomes-para-urso-de-pelucia-768x768_l0nxpl.webp',
    'https://res.cloudinary.com/dengftv0a/image/upload/v1753447869/Gemini_Generated_Image_bxe9mdbxe9mdbxe9_bdoatp.jpg',
    'https://res.cloudinary.com/dengftv0a/image/upload/v1753447867/Gemini_Generated_Image_g3vr20g3vr20g3vr_uwfzd2.jpg',
    'https://res.cloudinary.com/dengftv0a/image/upload/v1753447409/bear-plush-icecream_480x480_klpfu4.jpg',
    'https://res.cloudinary.com/dengftv0a/image/upload/v1753447848/Gemini_Generated_Image_h3s107h3s107h3s1_lmtlta.jpg',
    'https://res.cloudinary.com/dengftv0a/image/upload/v1753447863/Gemini_Generated_Image_z5b3j7z5b3j7z5b3_yirije.jpg',
    'https://res.cloudinary.com/dengftv0a/image/upload/v1753447865/Gemini_Generated_Image_knxefxknxefxknxe_varjnt.jpg',
    'https://res.cloudinary.com/dengftv0a/image/upload/v1753447413/Cute-Pink-Teddy-Bear-StuffedAnimal_1_480x480_jdl1fk.jpg',
    'https://res.cloudinary.com/dengftv0a/image/upload/v1752701072/admin.chamanozap.net/wp-content/themes/neve/assets/img/patterns/neve-patterns-12.jpg',
    'https://res.cloudinary.com/dengftv0a/image/upload/v1752668100/samples/landscapes/beach-boat.jpg',
    'https://res.cloudinary.com/dengftv0a/image/upload/v1752668099/samples/people/boy-snow-hoodie.jpg',
];

// Cores aleatórias para fundo das mensagens
const coresFundoMensagem = [
    '#EF4444', '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#F43F5E'
];

export default function GeradorMensagemBomdia() {
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const [coresCartoes, setCoresCartoes] = useState<string[]>([]);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const coresSorteadas = mensagens.map(
            () => coresFundoMensagem[Math.floor(Math.random() * coresFundoMensagem.length)]
        );
        setCoresCartoes(coresSorteadas);
    }, []);

    const handleCopy = async (text: string, index: number) => {
        await navigator.clipboard.writeText(`${text}\n\nvia chamanozap.net`);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    const handleDownload = async (index: number) => {
        const card = cardRefs.current[index];
        if (card) await exportCardImage(card, `bom-dia-${index + 1}.png`);
    };

    const handleShare = (mensagem: string) => {
        const texto = `${mensagem}\n\nvia chamanozap.net`;
        const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(texto)}`;
        window.open(url, '_blank');
    };

    return (
        <>
            <Head>
                <title>Mensagens de Bom Dia para WhatsApp: Lindas Frases e Imagens Grátis</title>
                <meta name="description" content="Compartilhe as melhores mensagens de bom dia com fé, carinho e positividade no WhatsApp. Baixe imagens grátis e inspire o dia dos seus amigos e familiares." />

                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Mensagens de Bom Dia para WhatsApp" />
                <meta property="og:description" content="As mais belas mensagens de bom dia para compartilhar e inspirar!" />
                <meta property="og:image" content={imagens[1]} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:url" content="https://chamanozap.net/mensagem-de-bom-dia-para-whatsapp" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Mensagens de Bom Dia para WhatsApp" />
                <meta name="twitter:description" content="As mais belas mensagens de bom dia para compartilhar e inspirar!" />
                <meta name="twitter:image" content={imagens[1]} />
            </Head>


            <main className="max-w-5xl mx-auto px-4 py-10">
                <h1 className="text-4xl font-extrabold text-green-700 mb-6 text-center">
                    Mensagens de Bom Dia para WhatsApp: Frases e Imagens Grátis 🌅
                </h1>

                <p className="text-lg text-gray-700 mb-8 leading-relaxed text-center">
                    Comece o dia com o pé direito e espalhe positividade! Aqui no <strong className="font-semibold">ChamanoZap.net</strong>, você encontra as mais lindas e inspiradoras <strong>mensagens de bom dia para WhatsApp</strong>, perfeitas para motivar amigos, familiares e colegas. Copie, baixe e compartilhe!
                </p>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {mensagens.map((mensagem, index) => (
                        <div
                            key={index}
                            ref={(el) => { cardRefs.current[index] = el; }}
                            className="bg-white rounded-xl border shadow hover:shadow-lg transition overflow-hidden"
                        >
                            <Image
                                src={imagens[index % imagens.length]}
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
                                <p className="text-xs mt-4 opacity-80 border-t border-white pt-2">via chamanozap.net</p>
                            </div>

                            <div className="flex gap-3 justify-center mt-3 mb-4 px-4">
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

                {/* Seções informativas */}
                <hr className="my-12 border-gray-300" />
                <InfoSection />
            </main>
        </>
    );
}

// Componente extraído para organização
function InfoSection() {
    return (
        <>
            <section>
                <h2 className="text-3xl font-bold text-green-600 mb-6 text-center">Por Que Compartilhar Mensagens de Bom Dia?</h2>
                <p className="text-gray-600 mb-4 text-justify">
                    Uma simples <strong>mensagem de bom dia</strong> pode transformar o dia de alguém. É um gesto de carinho e uma forma poderosa de demonstrar que você se importa.
                </p>
                <p className="text-gray-600 text-justify">
                    Compartilhar essas mensagens fortalece laços e contribui para um ambiente mais otimista e feliz.
                </p>
            </section>

            <hr className="my-12 border-gray-300" />

            <section>
                <h2 className="text-3xl font-bold text-green-600 mb-6 text-center">Dicas para Usar Suas Mensagens de Bom Dia no WhatsApp</h2>
                <ul className="list-disc list-inside text-gray-600 mb-4 ml-4 space-y-1">
                    <li><strong>Variação é chave:</strong> Envie uma mensagem diferente a cada dia.</li>
                    <li><strong>Impacto visual:</strong> Combine frases com imagens para mais impacto.</li>
                    <li><strong>Personalize:</strong> Inclua o nome da pessoa ou um toque pessoal.</li>
                    <li><strong>Use nos grupos e status:</strong> Alcance ainda mais pessoas com positividade.</li>
                </ul>
            </section>

            <hr className="my-12 border-gray-300" />

            <section>
                <h2 className="text-3xl font-bold text-green-600 mb-6 text-center">Frases de Bom Dia para Cada Ocasião</h2>
                <p className="text-gray-600 mb-4 text-justify">
                    Deseje um <strong>bom dia abençoado</strong>, envie uma <strong>mensagem de carinho</strong> ou motive no começo da semana. Temos opções para todos os momentos!
                </p>
                <p className="text-gray-600 text-justify">
                    Navegue, escolha suas favoritas e transforme a manhã de alguém com ChamanoZap.net.
                </p>
            </section>
        </>
    );
}
