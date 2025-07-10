import React from 'react';

interface AdContainerProps {
    children: React.ReactNode;
    className?: string;
}

export default function AdContainer({ children, className = '' }: AdContainerProps) {
    return (
        <div className={`
            w-full 
            max-w-full 
            overflow-hidden 
            bg-white 
            border 
            border-gray-200 
            rounded-lg 
            shadow-sm 
            p-4 
            my-6 
            ${className}
        `}>
            <div className="w-full max-w-full overflow-hidden flex justify-center items-center">
                {children}
            </div>
        </div>
    );
} 