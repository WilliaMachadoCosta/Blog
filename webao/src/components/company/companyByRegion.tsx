'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import CompanyLogo from "../company/companyLogo";
import { getPostsByCategorySlug } from "@/services/postServices";


interface Company {
    slug: string;
    empresaNome: string;
    empresaLogo: string;
    cidade?: string;
    comments?: any[];
}

interface CompaniesByStateProps {
    estadosSlugs: string[]; // slugs das categorias no WordPress
}

interface CompaniesGroupedByCity {
    [cidade: string]: Company[];
}

// Componente de loading para cada item (estilo stories)
function CompanyItemSkeleton() {
    return (
        <div className="flex flex-col items-center gap-2 animate-pulse w-20">
            <div className="w-16 h-16 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full"></div>
            <div className="h-3 bg-gray-300 rounded w-12"></div>
        </div>
    );
}

// Componente que mostra empresas de uma cidade
function CompaniesScroll({ companies }: { companies: Company[] }) {
    if (!companies || companies.length === 0) return null;

    return (
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {companies.map((company) => (
                <Link key={company.slug} href={`/${company.slug}`} prefetch={false} className="flex-shrink-0">
                    <div className="flex flex-col items-center group cursor-pointer">
                        <div className="relative p-0.5 bg-gradient-to-r from-[#d62976] to-[#fa7e1e] rounded-full group-hover:scale-105 transition-transform duration-300">
                            <div className="bg-white p-0.5 rounded-full">
                                <CompanyLogo
                                    src={company.empresaLogo}
                                    alt={`Logo da ${company.empresaNome}`}
                                    fallbackText={company.empresaNome}
                                    size="md"
                                />
                            </div>
                        </div>
                        <p className="mt-2 text-xs font-medium text-gray-900 text-center truncate max-w-16 group-hover:text-[#d62976] transition-colors duration-300">
                            {company.empresaNome.length > 12 ? `${company.empresaNome.slice(0, 12)}...` : company.empresaNome}
                        </p>
                    </div>
                </Link>
            ))}
        </div>
    );
}

// Componente principal
export default function CompaniesByState({ estadosSlugs }: CompaniesByStateProps) {
    const [companiesByState, setCompaniesByState] = useState<Record<string, CompaniesGroupedByCity>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCompanies() {
            setLoading(true);
            const result: Record<string, CompaniesGroupedByCity> = {};

            for (const estado of estadosSlugs) {
                try {
                    const posts = await getPostsByCategorySlug(estado);

                    const companies: Company[] = posts.map((post) => ({
                        slug: post.slug,
                        empresaNome: post.title,
                        empresaLogo: post.featuredImage,
                        cidade: post.excerpt || "Cidade Desconhecida", // opcional, você pode ajustar para extrair cidade
                    }));

                    // Agrupar por cidade
                    const grouped: CompaniesGroupedByCity = {};
                    companies.forEach((c) => {
                        const cidade = c.cidade || "Outros";
                        if (!grouped[cidade]) grouped[cidade] = [];
                        grouped[cidade].push(c);
                    });

                    result[estado] = grouped;
                } catch (err) {
                    console.error(`Erro ao buscar empresas do estado ${estado}:`, err);
                }
            }

            setCompaniesByState(result);
            setLoading(false);
        }

        fetchCompanies();
    }, [estadosSlugs]);

    if (loading) {
        return (
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {[...Array(5)].map((_, i) => <CompanyItemSkeleton key={i} />)}
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {Object.keys(companiesByState).map((estado) => (
                <div key={estado}>
                    <h2 className="text-lg font-bold mb-4 capitalize">{estado.replace("-", " ")}</h2>
                    {Object.keys(companiesByState[estado]).map((cidade) => (
                        <div key={cidade} className="mb-6">
                            <h3 className="text-sm font-semibold mb-2">{cidade}</h3>
                            <CompaniesScroll companies={companiesByState[estado][cidade]} />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
