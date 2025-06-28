'use client';

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CompanyLogo from "../company/companyLogo";
import { getPostsByIds } from "@/services/postServices";
import { extractCompanyData } from "./companyData";

// const rawCompanies = await getPostsByIds([927, 1410, 6142, 476]);
const rawCompanies = await getPostsByIds([927]);

const companies = rawCompanies.map((post) => {
    const empresa = extractCompanyData(post.content);

    return {
        ...post,
        empresaNome: empresa.nome ?? post.title,
        empresaLogo: empresa.logo ?? post.featuredImage,
    };
});
export default function Container() {
    const itemsPerPage = 5; // Mostra 10 por página
    const [page, setPage] = useState(0);

    const totalPages = Math.ceil(companies.length / itemsPerPage);

    const pagedCompanies = companies.slice(
        page * itemsPerPage,
        (page + 1) * itemsPerPage
    );

    const nextPage = () => {
        if (page < totalPages - 1) {
            setPage((prev) => prev + 1);
        }
    };

    const prevPage = () => {
        if (page > 0) {
            setPage((prev) => prev - 1);
        }
    };

    return (
        <div className="min-h-screen bg-[#f5f3ef] p-4">
            <ul className="space-y-2 mb-8">
                {pagedCompanies.map((company) => (
                    <li key={company.slug}>
                        <Link href={`/post/${company.slug}`}>
                            <div className="flex items-center gap-3 bg-white p-3 rounded shadow cursor-pointer hover:bg-gray-100 transition">
                                <CompanyLogo
                                    src={company.empresaLogo}
                                    alt={`Logo da ${company.empresaNome}`}
                                    fallbackText={company.empresaNome}
                                />
                                <div>
                                    <p className="font-semibold text-black">{company.empresaNome}</p>
                                    <p className="font-normal text-neutral-800">{company.empresaNome}</p>
                                </div>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>

            {/* Paginação */}
            <div className="flex justify-center gap-3 mb-10">
                <button
                    onClick={prevPage}
                    disabled={page === 0}
                    className="flex items-center gap-1 px-4 py-2 rounded-full border border-green-900 text-green-900 hover:bg-green-900 hover:text-white transition disabled:opacity-50"
                >
                    <ChevronLeft size={20} /> Anterior
                </button>

                <span className="text-gray-700">Página {page + 1} de {totalPages}</span>

                <button
                    onClick={nextPage}
                    disabled={page >= totalPages - 1}
                    className="flex items-center gap-1 px-4 py-2 rounded-full border border-green-900 text-green-900 hover:bg-green-900 hover:text-white transition disabled:opacity-50"
                >
                    Próximo <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
}
