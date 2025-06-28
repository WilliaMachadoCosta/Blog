import {
    MessageCircle,
    Users,
    Building,
    User,
    Store
} from "lucide-react";

export function Footer() {
    return (
        <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 text-gray-600 px-2 py-2 flex justify-between items-center text-xs z-50">
            <div className="flex flex-col items-center flex-1">
                <MessageCircle size={22} className="mb-1" />
                <span className="text-[11px]">Conversas</span>
            </div>

            <div className="flex flex-col items-center flex-1">
                <Users size={22} className="mb-1" />
                <span className="text-[11px]">Contatos</span>
            </div>

            <div className="flex flex-col items-center flex-1">
                <Building size={22} className="mb-1" />
                <span className="text-[11px]">Empresas</span>
            </div>

            <div className="flex flex-col items-center flex-1">
                <User size={22} className="mb-1" />
                <span className="text-[11px]">Perfil</span>
            </div>

            <div className="flex flex-col items-center flex-1">
                <Store size={22} className="mb-1" />
                <span className="text-[11px]">Ferramentas</span>
            </div>
        </footer>
    );
}
