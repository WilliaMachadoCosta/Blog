'use client';

import TweetCard from '@/components/media/tweetcard';
import WebcamCapture from '@/components/media/webcam';
import { exportCardImage } from '@/utils/card';
import { usePostStore } from '@/utils/postState';
import { useState } from 'react';

export default function TweetGeneratorPage() {
    const titulo = usePostStore((state) => state.titulo);
    const excerto = usePostStore((state) => state.excerto);
    const imagemPost = usePostStore((state) => state.imagemPost);
    const autor = usePostStore((state) => state.autor);
    const slug = usePostStore((state) => state.slug);

    const [selfie, setSelfie] = useState('');

    const cta = `👉 Saiba mais em chamanozap.net/${slug}`;
    return (
        <main className="min-h-screen bg-[#f5f3ef] py-4 sm:py-6 px-2 sm:px-4 overflow-x-hidden">
            <article className="bg-white max-w-2xl mx-auto rounded-xl shadow-md p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6 overflow-hidden">
                <div className="mt-10">
                    <WebcamCapture onCapture={setSelfie} />

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
                        className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
                    >
                        📥 Baixar imagem
                    </button>
                </div>
            </article>
        </main>
    );
}
