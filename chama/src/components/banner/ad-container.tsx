import React from 'react';

interface AdContainerProps {
    children: React.ReactNode;
    className?: string;
}

export default function AdContainer({ children, className = '' }: AdContainerProps) {
    return (
        <div className={`
            ad-container
            w-full 
            max-w-full 
            overflow-hidden 
            bg-white 
            border 
            border-green-700
            rounded-lg 
            shadow-sm 
            px-4 py-12
            mb-6 mt-4
            ${className}
        `}>
            <div className="w-full max-w-full overflow-hidden flex justify-center">
                {children}
            </div>
        </div>
    );
} 