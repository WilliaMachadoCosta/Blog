
'use client'
import { Search, MessageCircle, MoreVertical } from 'lucide-react';

export default function Header() {
    return (
        <header className="flex items-center justify-between bg-[#008069] px-4 py-2 shadow-md">
            <div className="flex items-center gap-2 text-white text-xl font-semibold">
                Chama <span className="text-orange-500">🔥</span> No ZAP
            </div>

            {/* Ações */}
            <div className="flex items-center gap-4 text-white">
                <button className="hover:text-gray-300">
                    <Search size={20} />
                </button>
                <button className="hover:text-gray-300">
                    <MessageCircle size={20} />
                </button>
                <button className="hover:text-gray-300">
                    <MoreVertical size={20} />
                </button>
            </div>
        </header>
    );
}
