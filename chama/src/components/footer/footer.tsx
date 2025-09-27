'use client'; // importante para usar hooks

import {
    Building,
    MessageSquareText,
    SquareKanban,
    MessageSquareHeart,

    Undo2
} from "lucide-react";
import Link from "next/link";
import { usePostStore } from "@/utils/postState";
import { useRouter } from "next/navigation";

export function Footer() {
    const router = useRouter();

    const { empresa, telefone, whatsapp, site } = usePostStore();

    const query = new URLSearchParams();
    if (empresa) query.set("nome", empresa);
    if (whatsapp) query.set("whatsapp", whatsapp);
    if (telefone) query.set("telefone", telefone);
    if (site) query.set("site", site);

    const conversasHref = `/conversas?${query.toString()}`;
    const conversasNaoLidas = 7; // simula conversas não lidas

    return (
        <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 text-gray-600 px-1 sm:px-2 py-1 sm:py-2 flex flex-col items-center text-xs z-50">
            <div className="flex justify-between w-full">
                {empresa || telefone || whatsapp || site ? (
                    <Link
                        href={conversasHref}
                        className="relative flex flex-col items-center flex-1 hover:text-blue-500"
                    >
                        <div className="relative">
                            <MessageSquareText size={20} className="sm:w-5 sm:h-5 mb-1" />
                            {conversasNaoLidas > 0 && (
                                <span className="absolute -top-1.5 -right-2 bg-green-500 text-white text-[9px] sm:text-[10px] font-bold px-[5px] py-[1px] rounded-full border border-white">
                                    {conversasNaoLidas}
                                </span>
                            )}
                        </div>
                        <span className="text-[10px] sm:text-[11px]">Conversas</span>
                    </Link>
                ) : (
                    <div className="flex flex-col items-center flex-1 text-gray-300 cursor-not-allowed">
                        <MessageSquareText size={20} className="sm:w-5 sm:h-5 mb-1" />
                        <span className="text-[10px] sm:text-[11px]">Conversas</span>
                    </div>
                )}

                <Link
                    href="/mensagens"
                    className="flex flex-col items-center flex-1 hover:text-blue-500"
                >
                    <MessageSquareHeart size={20} className="sm:w-5 sm:h-5 mb-1" />
                    <span className="text-[10px] sm:text-[11px]">Mensagens</span>
                </Link>

                {/* 🔙 Botão de voltar */}
                <button
                    onClick={() => router.back()}
                    className="mt-2 flex items-center gap-1 text-blue-600 hover:text-blue-800 transition text-[11px] sm:text-xs font-medium"
                >
                    <Undo2 size={20} strokeWidth={2} />
                    Voltar
                </button>

                <Link
                    href="/sobre"
                    className="flex flex-col items-center flex-1 hover:text-blue-500"
                >
                    <Building size={20} className="sm:w-5 sm:h-5 mb-1" />
                    <span className="text-[10px] sm:text-[11px]">Quem somos</span>
                </Link>

                <Link
                    href="/ferramentas"
                    className="relative flex flex-col items-center flex-1 hover:text-blue-500"
                >
                    <div className="relative">
                        <SquareKanban size={20} className="sm:w-5 sm:h-5 mb-1" />
                        <span className="absolute top-[-2px] right-[-2px] w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
                    </div>
                    <span className="text-[10px] sm:text-[11px]">Ferramentas</span>
                </Link>
            </div>


        </footer>
    );
}
