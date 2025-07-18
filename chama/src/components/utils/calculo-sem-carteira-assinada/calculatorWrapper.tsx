// src/components/utils/CalculatorWrapper.tsx
'use client';

import dynamic from 'next/dynamic';

const CalculatorClient = dynamic(() => import('./calculator'), { ssr: false });

export default function CalculatorWrapper() {
    return <CalculatorClient />;
}
