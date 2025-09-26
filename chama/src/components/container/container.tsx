import Link from "next/link";
import { Suspense } from "react";
import { getPostsByIds } from "@/services/postServices";
import { extractCompanyData } from "./companyData";
import CompaniesListWithPagination from "./companies-list";
import BlogSection, { BlogSectionSkeleton } from "./BlogSection";
import GoogleAd from "../banner/google-ads";
import HeroHeader from "./hero";
import NoticiasSection, { NoticiasSectionSkeleton } from "./NoticiasSection";

// Skeletons
// function CompanyItemSkeleton() {
//     return (
//         <div className="flex justify-between bg-white p-3 sm:p-4 rounded shadow animate-pulse w-full">
//             <div className="flex gap-3 flex-1 min-w-0">
//                 <div className="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0"></div>
//                 <div className="flex-1 min-w-0">
//                     <div className="h-4 bg-gray-300 rounded w-32 mb-1"></div>
//                     <div className="h-3 bg-gray-200 rounded w-24"></div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// Dados de empresas (mantive)
async function CompaniesData() {
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

export default function Container({ showAds = true }: { showAds?: boolean }) {
    return (
        <div className="min-h-screen bg-white p-2 sm:p-4 space-y-3 max-w-full overflow-y-auto scrollbar-thin scrollbar-thumb-green-600 scrollbar-track-gray-200 pt-[50px]">

            {/* === Hero / Mensagem do Dia === */}


            {/* === Lista de Empresas (mantida, mas jogada para baixo) === */}
            {/* <section>
                <h2 className="text-lg font-semibold mb-3 text-black">🏢 Empresas</h2>
                {showAds && <GoogleAd className="my-6" />}
                <Suspense
                    fallback={
                        <div className="space-y-2 mb-8">
                            {[...Array(5)].map((_, i) => (
                                <CompanyItemSkeleton key={i} />
                            ))}
                        </div>
                    }
                >
                    <CompaniesData />
                </Suspense>
            </section> */}
            {/* === Blog Section (mantida no final) === */}
            <section>
                <Suspense fallback={<BlogSectionSkeleton />}>
                    <HeroHeader />
                </Suspense>
            </section>
            {/* === Noticias Section (mantida no final) === */}
            <section>
                <h2 className="text-lg font-semibold mb-3 text-black">Confira nossas Notícias</h2>
                <Suspense fallback={<NoticiasSectionSkeleton />}>
                    <NoticiasSection />
                </Suspense>
            </section>

            <div className="my-1 max-w-2xl mx-auto w-full h-[150px] rounded-lg relative">
                <div className="flex justify-center">
                    <GoogleAd className="my-9" />
                </div>
            </div>

            {/* === Blog Section (mantida no final) === */}
            <section>
                <h2 className="text-lg font-semibold mb-3 text-black">Mais Lidos</h2>
                <Suspense fallback={<BlogSectionSkeleton />}>
                    <BlogSection />
                </Suspense>
            </section>
        </div>
    );
}
