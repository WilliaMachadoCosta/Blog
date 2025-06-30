import {
    // Users,
    Building,
    // User,
    // Store,
    MessageSquareText
} from "lucide-react";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 text-gray-600 px-1 sm:px-2 py-1 sm:py-2 flex justify-between items-center text-xs z-50">
            <div className="flex flex-col items-center flex-1">
                <MessageSquareText size={20} className="sm:w-5 sm:h-5 mb-1" />
                <span className="text-[10px] sm:text-[11px]">Conversas</span>
            </div>

            {/* <div className="flex flex-col items-center flex-1">
                <Users size={20} className="sm:w-5 sm:h-5 mb-1" />
                <span className="text-[10px] sm:text-[11px]">Contatos</span>
            </div> */}

            <Link href="/sobre" className="flex flex-col items-center flex-1 hover:text-blue-500">
                <Building size={20} className="sm:w-5 sm:h-5 mb-1" />
                <span className="text-[10px] sm:text-[11px]">Quem somos</span>
            </Link>

            {/* <div className="flex flex-col items-center flex-1">
                <User size={20} className="sm:w-5 sm:h-5 mb-1" />
                <span className="text-[10px] sm:text-[11px]">Perfil</span>
            </div>

            <div className="flex flex-col items-center flex-1">
                <Store size={20} className="sm:w-5 sm:h-5 mb-1" />
                <span className="text-[10px] sm:text-[11px]">Ferramentas</span>
            </div> */}
        </footer>
    );
}
