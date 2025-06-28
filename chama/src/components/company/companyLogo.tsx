'use client';

import Image from 'next/image';
import { useState } from 'react';

type CompanyLogoProps = {
    src?: string;
    alt?: string;
    fallbackText: string;
};

export default function CompanyLogo({ src, alt = '', fallbackText }: CompanyLogoProps) {
    const [imageError, setImageError] = useState(false);

    if (!src || imageError) {
        return (
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white text-sm font-semibold">
                {fallbackText.charAt(0).toUpperCase()}
            </div>
        );
    }

    return (
        <div className="w-8 h-8 rounded-full overflow-hidden">
            <Image
                src={src}
                alt={alt}
                width={32}
                height={32}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
            />
        </div>
    );
}
