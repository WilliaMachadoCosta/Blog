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
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;

    const totalPages = Math.ceil(companies.length / itemsPerPage);
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentCompanies = companies.slice(startIndex, endIndex);

    const nextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    return (
        <>
            <ul className="space-y-2 mb-8">
                {currentCompanies.map((company) => (
                    <li key={company.slug}>
                        <Link href={`/post/${company.slug}`} prefetch={false}>
                            <div className="flex items-center justify-between bg-white p-3 sm:p-4 rounded shadow cursor-pointer hover:bg-gray-100 transition w-full">
                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                    <CompanyLogo
                                        src={company.empresaLogo}
                                        alt={`Logo da ${company.empresaNome}`}
                                        fallbackText={company.empresaNome}
                                    />
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-black text-sm sm:text-base truncate">
                                            {company.empresaNome.length > 50
                                                ? `${company.empresaNome.slice(0, 30)}...`
                                                : company.empresaNome}
                                        </p>
                                        <p className="font-normal text-neutral-800 text-xs sm:text-sm truncate">
                                            {company.excerpt.length > 30
                                                ? `${company.excerpt.slice(3, 30)}...`
                                                : company.excerpt}
                                        </p>
                                    </div>
                                </div>

                                {/* Indicador de comentários */}
                                {company.comments && company.comments.length > 0 && (
                                    <div className="flex flex-col items-end gap-1">
                                        <div className="bg-green-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center min-w-[20px]">
                                            {company.comments.length > 99 ? '99+' : company.comments.length}
                                        </div>
                                        <span className="text-xs text-gray-500">
                                            {/* {company.comments.length === 1 ? 'comentário' : 'comentários'} */}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>

            {totalPages > 1 && (
                <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 mt-6 mb-12 px-4">
                    <button
                        onClick={prevPage}
                        disabled={currentPage === 0}
                        className={`px-3 py-1 rounded text-sm font-medium border transition-all
        ${currentPage === 0
                                ? "text-gray-400 border-gray-300 cursor-not-allowed font-bold"
                                : "text-green-700  border-green-600 hover:bg-green-100 font-bold"}`}
                    >
                        Anterior
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i)}
                            className={`w-8 h-8 text-sm rounded transition-all font-medium
          ${i === currentPage
                                    ? "bg-green-600 text-white font-bold shadow"
                                    : "text-green-700 hover:bg-green-100 font-bold"}`}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        onClick={nextPage}
                        disabled={currentPage >= totalPages - 1}
                        className={`px-3 py-1 rounded text-sm font-medium border transition-all
        ${currentPage >= totalPages - 1
                                ? "text-gray-400 border-gray-300 cursor-not-allowed"
                                : "text-green-700 border-green-600 hover:bg-green-100"}`}
                    >
                        Próximo
                    </button>
                </div>
            )}


        </>
    );
} 