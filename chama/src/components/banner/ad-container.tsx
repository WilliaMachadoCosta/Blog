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
            rounded-lg 
            shadow-sm 
            px-0 py-0
            mb-0 mt-0
         
            ${className}
        `}>

            <div className="w-full max-w-full overflow-hidden flex justify-center">
                {children}
            </div>
        </div>
    );
} 