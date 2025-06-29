'use client'
import { Search, MoreVertical } from "lucide-react";
import Link from "next/link";
import CompanyLogo from "../company/companyLogo";

export default function Header() {
    return (
        <header className="w-full bg-[#f5f3ef] text-black flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 shadow-md">
            {/* Logo ou Nome */}
            <div className="text-lg sm:text-xl font-semibold">
                {/* Pesquisa */}
                <button aria-label="Pesquisar">
                    <CompanyLogo src={"/logos/chama.png"}
                        alt={`Logo Chama No Zap`}
                        fallbackText={"Chama no Zap"} />
                </button>
            </div>

            {/* Ícones */}
            <div className="flex items-center gap-3 sm:gap-5">
                {/* Link para Blog */}
                <Link href="#" aria-label="Blog" className="hidden sm:block">
                    <p className="font-semibold text-sm sm:text-base">Blog</p>
                </Link>

                {/* Pesquisa */}
                <button aria-label="Pesquisar" className="p-1 hover:bg-gray-200 rounded-full transition-colors">
                    <Search className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>

                {/* Menu (três pontinhos) */}
                <button aria-label="Menu" className="p-1 hover:bg-gray-200 rounded-full transition-colors">
                    <MoreVertical className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
            </div>
        </header>
    );
}
