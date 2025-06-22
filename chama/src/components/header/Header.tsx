
'use client'
import { Menu } from 'lucide-react';

export default function Header() {
    return (

        <header className="bg-green-900 text-white p-4 flex items-center justify-between">
            <h1 className="text-xl font-bold">Atendimento</h1>
            <Menu className="w-6 h-6" />
        </header>
    );
}
