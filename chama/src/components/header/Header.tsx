
'use client'
import { Search, MoreVertical } from "lucide-react";
import Link from "next/link";
import CompanyLogo from "../company/companyLogo";

export default function Header() {
    return (
        <header className="w-full bg-[#f5f3ef] text-black flex items-center justify-between px-4 py-3 shadow-md">
            {/* Logo ou Nome */}
            <div className="text-xl font-semibold">
                {/* Pesquisa */}
                <button aria-label="Pesquisar">
                    <CompanyLogo src={"/logos/chama.png"}
                        alt={`Logo Chama No Zap`}
                        fallbackText={"Chama no Zap"} />
                </button>
            </div>

            {/* Ícones */}

            <div className="flex items-center gap-5">
                {/* Link para Blog */}
                <Link href="#" aria-label="Blog">
                    <p className="font-semibold">Blog</p>
                </Link>

                {/* Pesquisa */}
                <button aria-label="Pesquisar">
                    <Search className="w-6 h-6" />
                </button>

                {/* Menu (três pontinhos) */}
                <button aria-label="Menu">
                    <MoreVertical className="w-6 h-6" />
                </button>
            </div>
        </header>
    );
}
