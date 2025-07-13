'use client';

import TweetCard from '@/components/media/tweetcard';
import WebcamCapture from '@/components/media/webcam';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Facebook, Instagram, Twitter, MessageCircle } from 'lucide-react';

export default function TweetGeneratorPage() {
    const params = useSearchParams();
    const titulo = params.get('titulo') ?? '';
    const excerto = params.get('excerto') ?? '';
    const imagemPost = params.get('imagemPost') ?? '';
    const autor = params.get('autor') ?? '';
    const slug = params.get('slug') ?? '';

    const [selfie, setSelfie] = useState('');

    const cta = `👉 Saiba mais em chamanozap.net`;

    const currentUrl = typeof window !== 'undefined'
        ? `https://seusite.com/post/${slug}`
        : '';

    const handleShare = (platform: string) => {
        const encodedUrl = encodeURIComponent(currentUrl);
        let shareUrl = '';

        switch (platform) {
            case 'whatsapp':
                shareUrl = `https://wa.me/?text=${encodedUrl}`;
                break;
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}`;
                break;
            case 'instagram':
                alert('Instagram não permite compartilhamento direto. Copie o link manualmente.');
                return;
        }

        if (shareUrl) window.open(shareUrl, '_blank');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-4xl flex flex-col lg:flex-row items-center gap-8">
                <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center gap-4 w-full lg:w-1/2">
                    <WebcamCapture onCapture={setSelfie} />
                </div>

                <div className="flex flex-col items-center gap-4 w-full lg:w-1/2">
                    <TweetCard
                        author={""}
                        avatar={selfie}
                        excerto={excerto}
                        imagemPost={imagemPost}
                        cta={cta}
                        slug={slug}
                    />

                    <div className="flex gap-3 mt-4">
                        <button
                            onClick={() => handleShare('whatsapp')}
                            className="p-3 bg-green-500 hover:bg-green-600 text-white rounded-full shadow transition"
                            title="Compartilhar no WhatsApp"
                        >
                            <MessageCircle size={20} />
                        </button>
                        <button
                            onClick={() => handleShare('facebook')}
                            className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow transition"
                            title="Compartilhar no Facebook"
                        >
                            <Facebook size={20} />
                        </button>
                        <button
                            onClick={() => handleShare('twitter')}
                            className="p-3 bg-sky-500 hover:bg-sky-600 text-white rounded-full shadow transition"
                            title="Compartilhar no Twitter"
                        >
                            <Twitter size={20} />
                        </button>
                        <button
                            onClick={() => handleShare('instagram')}
                            className="p-3 bg-pink-500 hover:bg-pink-600 text-white rounded-full shadow transition"
                            title="Copiar link para Instagram"
                        >
                            <Instagram size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
