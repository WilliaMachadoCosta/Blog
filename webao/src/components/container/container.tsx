import Link from "next/link";

import CompanyLogo from "../company/companyLogo";
import { getPostsByIds } from "@/services/postServices";
import { extractCompanyData } from "./companyData";
import { Suspense } from "react";
import CompaniesListWithPagination from "./companies-list";
import BlogSection, { BlogSectionSkeleton } from "./BlogSection";
import YouTubeVideos, { YouTubeVideosSkeleton } from "./youtube-videos";
import GoogleAd from "../banner/google-ads";
import AdContainer from "../banner/ad-container";
import CompaniesByRegion from "../company/companyByRegion";
import CompaniesByState from "../company/companyByRegion";
import StatePreviews from "../company/preview-company";

// Componente de loading para cada item
function CompanyItemSkeleton() {
    return (
        <div className="flex justify-between bg-white p-3 sm:p-4 rounded-xl shadow-lg animate-pulse w-full card-insta">
            <div className="flex gap-3 flex-1 min-w-0">
                <div className="w-8 h-8 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                    <div className="h-4 bg-gradient-to-r from-gray-300 to-gray-400 rounded w-32 mb-1"></div>
                    <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-24"></div>
                </div>
            </div>
        </div>
    );
}

// Componente que busca e renderiza os dados
async function CompaniesData() {
    try {
        console.log("🔍 Buscando empresas...");
        // const rawCompanies = await getPostsByIds([927, 1410, 6142, 476, 7427, 417, 1091, 758, 1128, 826, 153, 482,
        //     7906, 1057, 4241, 6084, 7701, 1259, 2783, 1026, 716, 1165, 320]);
        const rawCompanies = await getPostsByIds([1586, 3464, 1192, 6204, 10147, 2204, 2710, 2931, 3813, 5414, 6358]);

        console.log("📊 Raw companies recebidas:", rawCompanies.length);
        console.log("📋 Primeira empresa (exemplo):", rawCompanies[0] ? {
            id: rawCompanies[0].id,
            title: rawCompanies[0].title,
            featuredImage: rawCompanies[0].featuredImage
        } : "Nenhuma empresa encontrada");

        const companies = rawCompanies.map((post) => {
            const empresa = extractCompanyData(post.content);
            const processedCompany = {
                ...post,
                empresaNome: empresa.nome ?? post.title,
                empresaLogo: empresa.logo ?? post.featuredImage,
            };
            console.log(`🏢 Empresa processada: ${processedCompany.empresaNome}`);
            return processedCompany;
        });

        console.log("✅ Total de empresas processadas:", companies.length);
        console.log("📝 Lista de empresas:", companies.map(c => c.empresaNome));

        if (companies.length === 0) {
            console.warn("⚠️ Nenhuma empresa encontrada! Verificando possíveis problemas...");
            return (
                <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-yellow-800 text-sm">
                        ⚠️ Nenhuma empresa foi encontrada. Verifique a conexão com a API ou os IDs das empresas.
                    </p>
                </div>
            );
        }

        return <CompaniesListWithPagination companies={companies} />;
    } catch (error) {
        console.error("❌ Erro ao buscar empresas:", error);
        return (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 text-sm">
                    ❌ Erro ao carregar empresas: {error instanceof Error ? error.message : 'Erro desconhecido'}
                </p>
            </div>
        );
    }
}

// Componente principal otimizado
export default function Container({ showAds = true }: { showAds?: boolean }) {
    return (
        <div className="space-y-8 max-w-full overflow-hidden">
            {/* Seção de Empresas - Stories Style */}
            <div className="relative z-10 max-w-full overflow-hidden">
                {/* 📢 Bloco de anúncio do Google AdSense */}
                {showAds && <GoogleAd className="my-6" />}
                <Suspense fallback={
                    <div className="space-y-3 mb-8">
                        {[...Array(5)].map((_, i) => (
                            <CompanyItemSkeleton key={i} />
                        ))}
                    </div>
                }>
                    <CompaniesData />
                </Suspense>
            </div>

            {/* 📢 Bloco de anúncio do Google AdSense */}
            {showAds && <GoogleAd className="my-6" />}

            {/* Seção de Empresas por Estado/Cidade */}
            <div className="relative z-10 max-w-full overflow-hidden">
                <Suspense fallback={<div>Carregando regiões...</div>}>
                    <StatePreviews
                        estadosSlugs={["bahia", "sao-paulo", "minas-gerais", "sergipe", "parana"]}
                        previewCount={3} // mostrar apenas 3 empresas por estado
                    />
                </Suspense>
            </div>
            {/* 📢 Bloco de anúncio do Google AdSense */}
            {showAds && <GoogleAd className="my-6" />}

            {/* Seção de Blog - Feed Style */}
            <div className="relative z-10 max-w-full overflow-hidden">
                <Suspense fallback={<BlogSectionSkeleton />}>
                    <BlogSection />
                </Suspense>
            </div>
        </div>
    );
}
