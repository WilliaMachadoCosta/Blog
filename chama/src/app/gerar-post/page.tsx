'use client';

import TweetCard from '@/components/media/tweetcard';
import WebcamCapture from '@/components/media/webcam';
import { exportCardImage } from '@/utils/card';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function TweetGeneratorPage() {
    const params = useSearchParams();
    const titulo = params.get('titulo') ?? '';
    const excerto = params.get('excerto') ?? '';
    const imagemPost = params.get('imagemPost') ?? '';
    const autor = params.get('autor') ?? '';
    const slug = params.get('slug') ?? '';

    const [selfie, setSelfie] = useState('');

    const cta = `👉 Saiba mais em chamanozap.net`;

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-4xl flex flex-col lg:flex-row items-center gap-8">
                <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center gap-4 w-full lg:w-1/2">
                    <WebcamCapture onCapture={setSelfie} />
                </div>

                <div className="flex flex-col items-center gap-4 w-full lg:w-1/2">
                    <TweetCard
                        author={autor}
                        avatar={selfie}
                        excerto={excerto}
                        imagemPost={imagemPost}
                        cta={cta}
                        slug={slug}
                    />
                    <button
                        onClick={exportCardImage}
                        className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition duration-200"
                    >
                        📥 Baixar imagem
                    </button>
                </div>
            </div>
        </div>
    );
}
