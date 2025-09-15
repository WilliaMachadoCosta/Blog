'use client'; // importante para usar hooks

import {
    Building,
    MessageSquareText,
    SquareKanban,
    MessageSquareHeart
} from "lucide-react";
import Link from "next/link";
import { usePostStore } from "@/utils/postState";

export function Footer() {
    // Pega dados do post/empresa da store Zustand
    const { empresa, telefone, whatsapp, site } = usePostStore();

    // Monta query string com dados da empresa, só inclui se tiver valor
    const query = new URLSearchParams();

    if (empresa) query.set('nome', empresa);
    if (whatsapp) query.set('whatsapp', whatsapp);
    if (telefone) query.set('telefone', telefone);
    if (site) query.set('site', site);

    // Monta a URL final com query string
    const conversasHref = `/conversas?${query.toString()}`;
    const conversasNaoLidas = 7; // simula conversas não lidas

    return (
        <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 text-gray-600 px-4 py-2 flex flex-col items-center text-xs z-50">
            <div className="flex justify-between w-full max-w-md">
                {empresa || telefone || whatsapp || site ? (
                    <Link href={conversasHref} className="relative flex flex-col items-center flex-1 hover:text-[#d62976] transition-colors duration-300">
                        <div className="relative">
                            <MessageSquareText size={20} className="mb-1" />
                            {conversasNaoLidas > 0 && (
                                <span className="absolute -top-1 -right-1 bg-[#d62976] text-white text-[9px] font-bold px-1 py-0.5 rounded-full border border-white">
                                    {conversasNaoLidas}
                                </span>
                            )}
                        </div>
                        <span className="text-[10px]">Conversas</span>
                    </Link>
                ) : (
                    <div className="flex flex-col items-center flex-1 text-gray-300 cursor-not-allowed">
                        <MessageSquareText size={20} className="mb-1" />
                        <span className="text-[10px]">Conversas</span>
                    </div>
                )}

                <Link href="/mensagens" className="flex flex-col items-center flex-1 hover:text-[#d62976] transition-colors duration-300">
                    <MessageSquareHeart size={20} className="mb-1" />
                    <span className="text-[10px]">Mensagens</span>
                </Link>

                <Link href="/sobre" className="flex flex-col items-center flex-1 hover:text-[#d62976] transition-colors duration-300">
                    <Building size={20} className="mb-1" />
                    <span className="text-[10px]">Sobre</span>
                </Link>

                <Link href="/ferramentas" className="relative flex flex-col items-center flex-1 hover:text-[#d62976] transition-colors duration-300">
                    <div className="relative">
                        <SquareKanban size={20} className="mb-1" />
                        <span className="absolute top-[-2px] right-[-2px] w-2 h-2 bg-[#d62976] border border-white rounded-full"></span>
                    </div>
                    <span className="text-[10px]">Ferramentas</span>
                </Link>
            </div>

            <div className="mt-2 text-center text-[9px]">
                <p className="text-[#d62976] font-medium">
                    Desenvolvido por Webao.Info
                </p>
            </div>
        </footer>
    );
}
