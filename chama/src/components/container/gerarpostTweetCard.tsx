'use client';

import TweetCard from '@/components/media/tweetcard';
import WebcamCapture from '@/components/media/webcam';
import { useSearchParams } from 'next/navigation';
import { useRef, useState } from 'react';
import { Download } from 'lucide-react';
import { exportCardImage } from '@/utils/exportTweetCard'; // ✅ certifique-se de que o caminho está correto
import GoogleAd from '../banner/google-ads';

export default function TweetGeneratorClient() {
    const params = useSearchParams();
    const titulo = params.get('titulo') ?? '';
    const excerto = params.get('excerto') ?? '';
    const imagemPost = params.get('imagemPost') ?? '';
    const autor = params.get('autor') ?? '';
    const slug = params.get('slug') ?? '';

    const [selfie, setSelfie] = useState('');
    const cardRef = useRef<HTMLDivElement>(null);
    const cta = `👉 Saiba mais em chamanozap.net`;

    const handleDownload = () => {
        if (cardRef.current) {
            exportCardImage(cardRef.current, 'tweet-card.png');
        }
    };


    return (
        <section className="w-full max-w-xl mx-auto mt-12 mb-6 px-2 sm:px-4">
            <div className="flex flex-col items-center gap-6">
                <GoogleAd />
                {/* Webcam */}
                <div className="w-full bg-white rounded-xl shadow-md p-4">
                    <WebcamCapture onCapture={setSelfie} />
                </div>

                {/* Card do Post */}
                <div ref={cardRef}>
                    <TweetCard
                        author={""}
                        avatar={selfie}
                        excerto={excerto}
                        imagemPost={imagemPost}
                        cta={cta}
                        slug={slug}
                    />
                </div>

                {/* Botões */}
                <div className="flex gap-3 flex-wrap justify-center">

                    <button
                        onClick={handleDownload}
                        className="p-3 bg-white hover:bg-gray-800 text-black rounded-full border-black shadow transition"
                        title="Baixar imagem do Tweet"
                    >
                        <Download size={20} />
                    </button>
                </div>
            </div>
        </section>
    );
}
