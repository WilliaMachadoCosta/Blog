// app/calculadoras/page.tsx
"use client";

import GoogleAd from "@/components/banner/google-ads";
import Head from "next/head";
import Link from "next/link";

const calculadoras = [
    {
        title: "Cálculo de Rescisão sem Carteira Assinada",
        description: "Entenda seus direitos e saiba como calcular sua rescisão sem carteira assinada.",
        url: "https://chamanozap.net/calculo-de-rescisao-sem-carteira-assinada-entenda-seus-direitos-e-como-calcular",
    },
    {
        title: "Calculadora de Rescisão",
        description: "Calcule sua rescisão de forma prática e rápida.",
        url: "https://chamanozap.net/calculadora-rescisao",
    },
];

export default function CalculadorasPage() {
    return (
        <>
            <Head>
                <title>Calculadoras | ChamanoZap</title>
                <meta
                    name="description"
                    content="Encontre todas as calculadoras do ChamanoZap, de forma prática e moderna."
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "ItemList",
                            "name": "Calculadoras ChamanoZap",
                            "itemListElement": calculadoras.map((calc, index) => ({
                                "@type": "ListItem",
                                position: index + 1,
                                name: calc.title,
                                url: calc.url,
                                description: calc.description,
                            })),
                        }),
                    }}
                />
            </Head>

            <GoogleAd></GoogleAd>

            <main className="min-h-screen  bg-gradient-to-b from-purple-100 pt-20 to-purple-50 p-6 gap-6">
                <div className="max-w-6xl mx-auto gap-6">
                    <h1 className="text-4xl font-bold mb-6 text-center text-gray-900">
                        Calculadoras ChamanoZap
                    </h1>
                    <p className="text-center mb-12 text-lg max-w-2xl mx-auto text-gray-900">
                        Confira nossas calculadoras online para facilitar seus cálculos trabalhistas de forma rápida e prática.
                    </p>

                    <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                        {calculadoras.map((calc, idx) => (
                            <Link
                                key={idx}
                                href={calc.url}
                                className="bg-white shadow-lg hover:shadow-xl transition p-8 rounded-xl flex flex-col justify-between"
                            >
                                <h2 className="text-2xl font-semibold mb-4 text-gray-900">{calc.title}</h2>
                                <p className="mb-6 text-gray-900">{calc.description}</p>
                                <span className="mt-auto inline-block font-semibold text-gray-900">
                                    Acessar Calculadora →
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>
        </>
    );
}
