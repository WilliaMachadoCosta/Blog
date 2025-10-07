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
        <div className="flex items-center justify-between bg-white px-2 sm:px-3 py-1.5 sm:py-2 rounded shadow-sm">
            {/* Esquerda: ícone voltar + logo + nome */}
            <div className="flex items-center gap-1 sm:gap-2 flex-1 min-w-0">
                <button onClick={onBack} className="text-blue-600 p-1 hover:bg-gray-100 rounded-full transition-colors" aria-label="Voltar">
                    <ArrowLeft size={16} className="sm:w-4 sm:h-4" />
                </button>

                <CompanyLogo
                    src={company.logo}
                    alt={`Logo da ${company.nome || "Empresa"}`}
                    fallbackText={company.nome || "Empresa"}
                />

                <div className="flex items-center flex-1 min-w-0">
                    <span className="text-xs sm:text-sm font-medium leading-none text-black truncate">
                        {company.nome}
                    </span>
                </div>
            </div>

            {/* Direita: ícones */}

        </div>
    );
}
