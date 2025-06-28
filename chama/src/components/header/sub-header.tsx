"use client";
import { ArrowLeft, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";
import CompanyLogo from "../company/companyLogo";

interface Company {
    nome?: string;
    logo?: string;
    telefone?: string;
}

interface SubHeaderProps {
    company: Company;
    onBack: () => void;
}

export function SubHeader({ company, onBack }: SubHeaderProps) {
    return (
        <div className="flex items-center justify-between bg-white px-3 py-2 rounded shadow-sm">
            {/* Esquerda: ícone voltar + logo + nome */}
            <div className="flex items-center gap-2">
                <button onClick={onBack} className="text-blue-600 p-1">
                    <ArrowLeft size={18} />
                </button>

                <CompanyLogo
                    src={company.logo}
                    alt={`Logo da ${company.nome || "Empresa"}`}
                    fallbackText={company.nome || "Empresa"}
                />

                <div className="flex items-center">
                    <span className="text-sm font-medium leading-none text-black">
                        {company.nome}
                    </span>
                </div>
            </div>

            {/* Direita: ícones */}
            <div className="flex items-center gap-3 text-blue-600 pr-1">
                <Link href={`#mensagem`} aria-label="Mensagem">
                    <MessageCircle size={18} />
                </Link>
                <a href={`tel:${company.telefone ?? ""}`} aria-label="Telefone">
                    <Phone size={18} />
                </a>
            </div>
        </div>
    );
}
