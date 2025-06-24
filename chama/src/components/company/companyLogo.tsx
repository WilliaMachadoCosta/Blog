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
            <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-white text-lg font-semibold">
                {fallbackText.charAt(0).toUpperCase()}
            </div>
        );
    }

    return (
        <Image
            src={src}
            alt={alt}
            width={48}
            height={48}
            className="rounded-full object-cover"
            onError={() => setImageError(true)}
        />
    );
}
