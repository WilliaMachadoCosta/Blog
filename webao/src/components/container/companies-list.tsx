'use client';

import { useState } from "react";
import Link from "next/link";
import CompanyLogo from "../company/companyLogo";

interface Company {
    slug: string;
    empresaNome: string;
    empresaLogo: string;
    excerpt: string;
    comments?: any[];
}

interface CompaniesListWithPaginationProps {
    companies: Company[];
}

export default function CompaniesListWithPagination({ companies }: CompaniesListWithPaginationProps) {
    // Mostrar todas as empresas no scroll horizontal
    const currentCompanies = companies;

    // Se não há empresas, mostrar mensagem
    if (!currentCompanies || currentCompanies.length === 0) {
        return (
            <div className="mb-6 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
                <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-[#d62976] to-[#fa7e1e] rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhuma empresa encontrada</h3>
                    <p className="text-gray-600 text-sm">As empresas serão exibidas aqui assim que estiverem disponíveis.</p>
                </div>
            </div>
        );
    }

    return (
        <>
            {/* Stories Style - Horizontal Scroll */}
            <div className="mb-6">
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {currentCompanies.map((company) => (
                        <Link key={company.slug} href={`/${company.slug}`} prefetch={false} className="flex-shrink-0">
                            <div className="flex flex-col items-center group cursor-pointer">
                                {/* Story Ring */}
                                <div className="relative p-0.5 bg-gradient-to-r from-[#d62976] to-[#fa7e1e] rounded-full group-hover:scale-105 transition-transform duration-300">
                                    <div className="bg-white p-0.5 rounded-full">
                                        <CompanyLogo
                                            src={company.empresaLogo}
                                            alt={`Logo da ${company.empresaNome}`}
                                            fallbackText={company.empresaNome}
                                            size="lg"
                                        />
                                    </div>
                                    {/* Badge de comentários */}
                                    {company.comments && company.comments.length > 0 && (
                                        <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-[#d62976] to-[#fa7e1e] text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-white">
                                            {company.comments.length > 99 ? '99+' : company.comments.length}
                                        </div>
                                    )}
                                </div>
                                
                                {/* Nome da empresa */}
                                <p className="mt-2 text-xs sm:text-sm font-medium text-gray-900 text-center max-w-16 sm:max-w-20 truncate group-hover:text-[#d62976] transition-colors duration-300">
                                    {company.empresaNome.length > 12
                                        ? `${company.empresaNome.slice(0, 12)}...`
                                        : company.empresaNome}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

        </>
    );
} 