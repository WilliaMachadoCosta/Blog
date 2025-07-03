import Link from "next/link";

import CompanyLogo from "../company/companyLogo";
import { getPostsByIds } from "@/services/postServices";
import { extractCompanyData } from "./companyData";
import { Suspense } from "react";
import CompaniesListWithPagination from "./companies-list";
import BlogSection, { BlogSectionSkeleton } from "./BlogSection";
import GoogleAd from "../banner/google-ads";

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

// Componente que busca e renderiza os dados
async function CompaniesData() {
    // const rawCompanies = await getPostsByIds([927, 1410, 6142, 476, 7427, 417, 1091, 758, 1128, 826, 153, 482,
    //     7906, 1057, 4241, 6084, 7701, 1259, 2783, 1026, 716, 1165, 320]);
    const rawCompanies = await getPostsByIds([927, 1410, 6142, 476, 7427, 417, 1091, 758, 1128]);

    const companies = rawCompanies.map((post) => {
        const empresa = extractCompanyData(post.content);
        return {
            ...post,
            empresaNome: empresa.nome ?? post.title,
            empresaLogo: empresa.logo ?? post.featuredImage,
        };
    });
    console.log("Total de empresas recebidas:", companies.length);

    return <CompaniesListWithPagination companies={companies} />;
}

// Componente principal otimizado
export default function Container() {
    return (
        <div className="min-h-screen bg-white p-2 sm:p-4 space-y-6">
            {/* Seção de Empresas */}
            <div className="relative z-10">
                <Suspense fallback={
                    <div className="space-y-2 mb-8">
                        {[...Array(5)].map((_, i) => (
                            <CompanyItemSkeleton key={i} />
                        ))}
                    </div>
                }>
                    <CompaniesData />
                </Suspense>
            </div>

            {/* 📢 Bloco de anúncio do Google AdSense */}
            <GoogleAd windowSize="large" className="my-8" />

            {/* Seção de Blog */}
            <div className="relative z-10">
                <Suspense fallback={<BlogSectionSkeleton />}>
                    <BlogSection />
                </Suspense>
            </div>
        </div>
    );
}
