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
}

interface StatePreviewProps {
    estadosSlugs: string[];
    previewCount?: number; // quantidade de empresas a mostrar na home
}

export default function StatePreviews({ estadosSlugs, previewCount = 3 }: StatePreviewProps) {
    const [statePreviews, setStatePreviews] = useState<Record<string, Company[]>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPreviews() {
            setLoading(true);
            const previews: Record<string, Company[]> = {};

            for (const estado of estadosSlugs) {
                try {
                    const posts = await getPostsByCategorySlug(estado);
                    const companies = posts.map((post) => ({
                        slug: post.slug,
                        empresaNome: post.title,
                        empresaLogo: post.featuredImage,
                        cidade: post.excerpt || "Cidade",
                    }));

                    previews[estado] = companies.slice(0, previewCount);
                } catch (err) {
                    console.error(`Erro ao buscar empresas do estado ${estado}:`, err);
                    previews[estado] = [];
                }
            }

            setStatePreviews(previews);
            setLoading(false);
        }

        fetchPreviews();
    }, [estadosSlugs, previewCount]);

    if (loading) {
        return (
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 animate-pulse w-20">
                        <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                        <div className="h-3 bg-gray-300 rounded w-12"></div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {Object.keys(statePreviews).map((estado) => (
                <div key={estado}>
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-lg font-bold capitalize text-orange-700">{estado.replace("-", " ")}</h2>
                        <Link href={`/empresas/${estado}`} className="text-sm text-blue-600 hover:underline">
                            Ver todas
                        </Link>
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                        {statePreviews[estado].map((company) => (
                            <Link key={company.slug} href={`/${company.slug}`} className="flex-shrink-0">
                                <div className="flex flex-col items-center cursor-pointer">
                                    <div className="p-0.5 bg-gradient-to-r from-[#d62976] to-[#fa7e1e] rounded-full">
                                        <div className="bg-white p-0.5 rounded-full">
                                            <CompanyLogo
                                                src={company.empresaLogo}
                                                alt={`Logo da ${company.empresaNome}`}
                                                fallbackText={company.empresaNome}
                                                size="md"
                                            />
                                        </div>
                                    </div>
                                    <p className="mt-1 text-xs font-medium text-gray-900 text-center truncate max-w-16">
                                        {company.empresaNome.length > 12
                                            ? `${company.empresaNome.slice(0, 12)}...`
                                            : company.empresaNome}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
