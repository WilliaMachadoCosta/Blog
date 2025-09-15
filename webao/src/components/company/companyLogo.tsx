'use client';

import Image from 'next/image';
import { useState } from 'react';

type CompanyLogoProps = {
    src?: string;
    alt?: string;
    fallbackText: string;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
};

export default function CompanyLogo({ src, alt = '', fallbackText, className = '', size = 'sm' }: CompanyLogoProps) {
    const [imageError, setImageError] = useState(false);

    const getSizeClasses = (size: 'sm' | 'md' | 'lg') => {
        switch (size) {
            case 'sm':
                return { container: 'w-8 h-8', image: { width: 32, height: 32 } };
            case 'md':
                return { container: 'w-12 h-12', image: { width: 48, height: 48 } };
            case 'lg':
                return { container: 'w-16 h-16 sm:w-20 sm:h-20', image: { width: 80, height: 80 } };
            default:
                return { container: 'w-8 h-8', image: { width: 32, height: 32 } };
        }
    };

    const sizeConfig = getSizeClasses(size);

    if (!src || imageError) {
        return (
            <div className={`${sizeConfig.container} rounded-full bg-gray-300 flex items-center justify-center text-white text-sm font-semibold`}>
                {fallbackText.charAt(0).toUpperCase()}
            </div>
        );
    }

    return (
        <div className={`${sizeConfig.container} rounded-full overflow-hidden`}>
            <Image
                src={src}
                alt={alt}
                width={sizeConfig.image.width}
                height={sizeConfig.image.height}
                className={`w-full h-full object-cover ${className}`}
                onError={() => setImageError(true)}
            />
        </div>
    );
}
