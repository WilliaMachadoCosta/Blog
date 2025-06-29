import Link from "next/link";

import CompanyLogo from "../company/companyLogo";
import { getPostsByIds } from "@/services/postServices";
import { extractCompanyData } from "./companyData";
import { Suspense } from "react";
import Pagination from "./pagination";

// Componente de loading para cada item
function CompanyItemSkeleton() {
    return (
        <div className="flex items-center justify-between bg-white p-3 sm:p-4 rounded shadow animate-pulse w-full">
            <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                    <div className="h-4 bg-gray-300 rounded w-32 mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded w-24"></div>
                </div>
            </div>
        </div>
    );
}

// Componente de lista de empresas otimizado
async function CompaniesList() {
    const rawCompanies = await getPostsByIds([927, 1410, 6142, 476, 7427, 417, 1091]);

    const companies = rawCompanies.map((post) => {
        const empresa = extractCompanyData(post.content);
        return {
            ...post,
            empresaNome: empresa.nome ?? post.title,
            empresaLogo: empresa.logo ?? post.featuredImage,
        };
    });

    return (
        <ul className="space-y-2 mb-8">
            {companies.map((company) => (
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
    );
}

// Componente principal otimizado
export default function Container() {
    return (
        <div className="min-h-screen bg-[#f5f3ef] p-2 sm:p-4">
            <Suspense fallback={
                <div className="space-y-2 mb-8">
                    {[...Array(5)].map((_, i) => (
                        <CompanyItemSkeleton key={i} />
                    ))}
                </div>
            }>
                <CompaniesList />
            </Suspense>

            <Pagination totalItems={1} itemsPerPage={5} />
        </div>
    );
}
