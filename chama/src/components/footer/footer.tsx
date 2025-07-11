import {
    // Users,
    Building,
    // User,
    // Store,
    MessageSquareText,
    Map
} from "lucide-react";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 text-gray-600 px-1 sm:px-2 py-1 sm:py-2 flex flex-col items-center text-xs z-50">
            <div className="flex justify-between w-full">
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

                {/* <Link href="/sitemap.xml" className="flex flex-col items-center flex-1 hover:text-blue-500">
                    <Map size={20} className="sm:w-5 sm:h-5 mb-1" />
                    <span className="text-[10px] sm:text-[11px]">Sitemap</span>
                </Link> */}
            </div>

            {/* Texto de rodapé */}
            <div className="mt-1 text-center text-[10px] sm:text-[11px]">
                <p>Desenvolvido e mantido por <a href="https://webao.info" target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-500">Webao.Info</a></p>
            </div>
        </footer>
    );
}
