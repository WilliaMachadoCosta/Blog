"use client";

import Head from "next/head";
import { AnimatePresence, motion } from "framer-motion";
import { Calculator, FileText, Banknote } from "lucide-react";
import CalculatorWrapper from '@/components/utils/calculo-sem-carteira-assinada/calculatorWrapper';
import { Metadata } from 'next';
import Script from 'next/script';
import GoogleAd from "@/components/banner/google-ads";
import GoogleAdsense from "@/components/banner/googleAdsense";

export default function CalculoRescisaoSemCarteira() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-700 to-white p-4 sm:p-6 text-white">
            <Head>
                <title>Cálculo de Rescisão sem Carteira Assinada 🧮 | Chama no Zap</title>
                <meta name="description" content="Entenda seus direitos trabalhistas e saiba como calcular a rescisão sem carteira assinada. Utilize nossa calculadora prática para trabalhadores informais." />
                <meta name="keywords" content="rescisão sem carteira assinada, cálculo rescisão, direitos trabalhador informal, férias proporcionais, aviso prévio, 13º salário" />
                <link rel="canonical" href="https://chamanozap.net/calculo-de-rescisao-sem-carteira-assinada-entenda-seus-direitos-e-como-calcular" />
            </Head>

            {/* JSON-LD para dados estruturados */}
            <Script
                id="ld-json"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Article",
                        headline: "Cálculo de Rescisão sem Carteira Assinada [CALCULADORA]",
                        description: "Entenda seus direitos trabalhistas e saiba como calcular a rescisão sem carteira assinada. Utilize nossa calculadora prática para trabalhadores informais.",
                        author: {
                            "@type": "Person",
                            name: "William Costa",
                        },
                        publisher: {
                            "@type": "Organization",
                            name: "Chama no Zap",
                            logo: {
                                "@type": "ImageObject",
                                url: "https://chamanozap.net/logo.png",
                            },
                        },
                        mainEntityOfPage: {
                            "@type": "WebPage",
                            "@id": "https://chamanozap.net/calculo-de-rescisao-sem-carteira-assinada-entenda-seus-direitos-e-como-calcular",
                        },
                        datePublished: "2025-01-17T12:00:00Z",
                        dateModified: "2025-01-17T12:00:00Z",
                    }),
                }}
            />

            <div className="max-w-5xl mx-auto mt-6 sm:mt-8">
                {/* Header */}
                <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3 sm:gap-0">
                    <h1 className="flex items-center gap-2 text-3xl sm:text-4xl font-extrabold drop-shadow-[0_0_10px_rgba(255,255,255,0.9)]">
                        <Calculator className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-300" />
                        Rescisão sem Carteira
                        <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-pink-200" />
                    </h1>
                    <p className="flex items-center gap-2 text-sm sm:text-base text-white font-medium">
                        Calcule seus direitos trabalhistas!
                        <Banknote className="w-5 h-5 text-green-300" />
                    </p>
                </header>

                <div className="mt-6 mb-6">
                    <p className="text-[10px] text-gray-500 text-center mb-2">Publicidade</p>
                    <GoogleAdsense
                        slot="9825364292"
                        className="border-2 border-amber-600 shadow-lg shadow-amber-500/30 rounded-xl"
                    />
                </div>

                {/* Bloco explicativo */}
                <section className="bg-white/90 text-gray-900 p-4 sm:p-6 rounded-2xl shadow mb-6">
                    <h2 className="text-lg sm:text-xl font-bold mb-2">Como funciona a calculadora?</h2>
                    <p className="text-sm sm:text-base">
                        Nossa calculadora de rescisão sem carteira assinada ajuda você a estimar os valores devidos mesmo trabalhando informalmente. O cálculo inclui: salário proporcional, férias proporcionais com 1/3, 13º salário proporcional e aviso prévio. O resultado é educativo e serve como referência — consulte sempre um profissional para os valores oficiais.
                    </p>

                    {/* CTA */}
                    <div className="mt-8 text-center">
                        <a
                            href="https://chamanozap.net/calculadora-rescisao"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-6 py-4 bg-gradient-to-r from-pink-500 to-yellow-400 text-white font-bold rounded-xl shadow-lg hover:scale-105 transition transform"
                        >
                            Veja também a Calculadora de Rescisão CLT 🎰
                        </a>
                    </div>
                </section>

                {/* Main grid */}
                <main className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {/* Calculadora */}
                    <section className="bg-white/90 text-gray-900 p-4 sm:p-6 rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.4)] w-full">
                        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-purple-700">
                            Calculadora de Rescisão
                        </h2>
                        <CalculatorWrapper />
                    </section>

                    {/* Informações */}
                    <section className="bg-white/90 text-gray-900 p-4 sm:p-6 rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.4)] w-full">
                        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-purple-700">
                            Direitos do Trabalhador Informal
                        </h2>
                        <div className="space-y-4">
                            <div className="p-3 bg-blue-50 rounded-lg">
                                <h3 className="font-semibold text-blue-800">Salário Proporcional</h3>
                                <p className="text-sm text-gray-700">Pagamento pelos dias efetivamente trabalhados no mês da rescisão</p>
                            </div>
                            <div className="p-3 bg-green-50 rounded-lg">
                                <h3 className="font-semibold text-green-800">Férias Proporcionais</h3>
                                <p className="text-sm text-gray-700">Direito a férias proporcionais acrescidas de 1/3 sobre o valor</p>
                            </div>
                            <div className="p-3 bg-yellow-50 rounded-lg">
                                <h3 className="font-semibold text-yellow-800">13º Salário Proporcional</h3>
                                <p className="text-sm text-gray-700">Cálculo proporcional ao número de meses trabalhados no ano</p>
                            </div>
                            <div className="p-3 bg-purple-50 rounded-lg">
                                <h3 className="font-semibold text-purple-800">Aviso Prévio</h3>
                                <p className="text-sm text-gray-700">Dependendo do tipo de rescisão, pode ter direito ao aviso prévio</p>
                            </div>
                        </div>
                    </section>
                </main>
            </div>

            {/* Seção de conteúdo */}
            <section className="max-w-4xl mx-auto px-4 py-12 text-gray-800">
                <h2 className="text-2xl font-bold mb-6">
                    O que é Rescisão de Contrato de Trabalho?
                </h2>
                <p className="mb-4">
                    A <strong>rescisão de contrato de trabalho</strong> ocorre quando a relação entre trabalhador e empregador é encerrada. Isso pode acontecer por diversos motivos, como demissão sem justa causa, pedido de demissão, rescisão por acordo, entre outros.
                </p>
                <p className="mb-6 font-semibold">
                    <em>Importante:</em> A rescisão de um contrato <strong>sem carteira assinada</strong> pode ser mais complexa, já que o trabalhador informal nem sempre possui os mesmos direitos trabalhistas garantidos pela CLT.
                </p>

                <h3 className="text-xl font-semibold mb-4">
                    Como Calcular a Rescisão sem Carteira Assinada
                </h3>
                <p className="mb-4">
                    Veja abaixo as fórmulas para calcular cada verba rescisória de forma clara e prática:
                </p>
                <ul className="list-disc list-inside mb-6 space-y-1">
                    <li><strong>Salário Proporcional:</strong> (Salário Mensal / 30) × Dias Trabalhados</li>
                    <li><strong>Férias Proporcionais:</strong> (Salário Mensal / 12) × Meses Trabalhados + 1/3 sobre este valor</li>
                    <li><strong>13º Salário Proporcional:</strong> (Salário Mensal / 12) × Meses Trabalhados</li>
                    <li><strong>Aviso Prévio:</strong> Pode ser devido em casos de demissão sem justa causa</li>
                </ul>

                <h3 className="text-xl font-semibold mb-4">Direitos do Trabalhador Informal</h3>
                <p className="mb-4">Mesmo sem carteira assinada, o trabalhador informal pode ter direito a algumas verbas rescisórias:</p>
                <ul className="list-disc list-inside mb-6 space-y-1">
                    <li>Salário proporcional — pagamento pelos dias efetivamente trabalhados no mês da rescisão</li>
                    <li>Férias proporcionais — direito a férias proporcionais acrescidas de 1/3 sobre o valor</li>
                    <li>13º salário proporcional — cálculo proporcional ao número de meses trabalhados no ano</li>
                    <li>Aviso prévio — dependendo do tipo de rescisão, o trabalhador pode ter direito ao aviso prévio indenizado ou trabalhado</li>
                </ul>

                <h3 className="text-xl font-semibold mb-4">Importante saber</h3>
                <p className="mb-4">
                    Esta calculadora é uma ferramenta informativa e não substitui uma avaliação jurídica profissional. Para dúvidas específicas, consulte um advogado trabalhista.
                </p>
                <p className="mb-8">
                    Mesmo trabalhando sem carteira assinada, você pode ter direitos trabalhistas. É importante documentar sua relação de trabalho e buscar orientação jurídica adequada.
                </p>
            </section>
        </div>
    );
}
