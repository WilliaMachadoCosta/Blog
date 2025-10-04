"use client";

import Head from "next/head";
import { AnimatePresence, motion } from "framer-motion";
import { TrendingUp, Calculator, DollarSign, BarChart3 } from "lucide-react";
import { useJurosCompostos } from "./useJurosCompostos";
import GoogleAd from "@/components/banner/google-ads";
import InvestmentChart from "@/components/charts/InvestmentChart";
import Script from 'next/script';

export default function CalculadoraJurosCompostos() {
    const {
        valorInicial,
        setValorInicial,
        aporteMensal,
        setAporteMensal,
        taxaJuros,
        setTaxaJuros,
        tempoInvestimento,
        setTempoInvestimento,
        showResult,
        setShowResult,
        result,
        chartData
    } = useJurosCompostos();

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-700 to-white p-4 sm:p-6 text-white">
            <Head>
                <title>Calculadora de Juros Compostos e Investimentos 📈 | Chama no Zap</title>
                <meta name="description" content="Calcule juros compostos e simule investimentos com nossa calculadora. Descubra como seus investimentos podem crescer ao longo do tempo." />
                <meta name="keywords" content="calculadora juros compostos, investimentos, simulação investimento, rendimento, poupança, CDB, tesouro direto" />
                <link rel="canonical" href="https://chamanozap.net/calculadora-juros-compostos-investimentos" />
            </Head>

            {/* JSON-LD para dados estruturados */}
            <Script
                id="ld-json"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Article",
                        headline: "Calculadora de Juros Compostos e Investimentos",
                        description: "Calcule juros compostos e simule investimentos com nossa calculadora. Descubra como seus investimentos podem crescer ao longo do tempo.",
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
                            "@id": "https://chamanozap.net/calculadora-juros-compostos-investimentos",
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
                        <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-300" />
                        Juros Compostos
                        <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 text-pink-200" />
                    </h1>
                    <p className="flex items-center gap-2 text-sm sm:text-base text-white font-medium">
                        Faça seu dinheiro trabalhar para você!
                        <DollarSign className="w-5 h-5 text-green-300" />
                    </p>
                </header>

                <GoogleAd />

                {/* Bloco explicativo */}
                <section className="bg-white/90 text-gray-900 p-4 sm:p-6 rounded-2xl shadow mb-6">
                    <h2 className="text-lg sm:text-xl font-bold mb-2">Como funciona a calculadora?</h2>
                    <p className="text-sm sm:text-base">
                        Nossa calculadora de juros compostos simula como seus investimentos podem crescer ao longo do tempo. Você pode simular diferentes cenários com valor inicial, aportes mensais, taxa de juros e tempo de investimento. O resultado mostra o valor total acumulado e os juros ganhos.
                    </p>
                </section>

                {/* Main grid */}
                <main className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {/* Formulário */}
                    <section className="bg-white/90 text-gray-900 p-4 sm:p-6 rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.4)] w-full">
                        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-green-700">
                            Simule seu investimento
                        </h2>

                        {/* Valor Inicial */}
                        <div className="flex flex-col mb-4">
                            <label className="text-sm mb-2 flex items-center gap-2">
                                <DollarSign className="w-4 h-4 text-green-600" />
                                Valor Inicial (R$)
                            </label>
                            <input
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                value={valorInicial}
                                onChange={(e) => setValorInicial(e.target.value)}
                                placeholder="Ex: 1000"
                                className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                        </div>

                        {/* Aporte Mensal */}
                        <div className="flex flex-col mb-4">
                            <label className="text-sm mb-2 flex items-center gap-2">
                                <TrendingUp className="w-4 h-4 text-blue-600" />
                                Aporte Mensal (R$)
                            </label>
                            <input
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                value={aporteMensal}
                                onChange={(e) => setAporteMensal(e.target.value)}
                                placeholder="Ex: 500"
                                className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                        </div>

                        {/* Taxa de Juros */}
                        <div className="flex flex-col mb-4">
                            <label className="text-sm mb-2 flex items-center gap-2">
                                <Calculator className="w-4 h-4 text-purple-600" />
                                Taxa de Juros Anual (%)
                            </label>
                            <input
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                value={taxaJuros}
                                onChange={(e) => setTaxaJuros(e.target.value)}
                                placeholder="Ex: 12"
                                className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                        </div>

                        {/* Tempo de Investimento */}
                        <div className="flex flex-col mb-4">
                            <label className="text-sm mb-2 flex items-center gap-2">
                                <BarChart3 className="w-4 h-4 text-orange-600" />
                                Tempo de Investimento (anos)
                            </label>
                            <input
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                value={tempoInvestimento}
                                onChange={(e) => setTempoInvestimento(e.target.value)}
                                placeholder="Ex: 10"
                                className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                        </div>

                        {/* Botões */}
                        <div className="flex flex-col sm:flex-row gap-3 mt-6">
                            <button
                                onClick={() => {
                                    setShowResult(true);
                                    window.scrollTo({ top: 0, behavior: "smooth" });
                                }}
                                className="flex-1 py-4 rounded-xl bg-gradient-to-r from-green-600 to-blue-500 text-white font-extrabold shadow-[0_0_20px_rgba(16,185,129,0.5)] hover:shadow-[0_0_25px_rgba(16,185,129,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 transform flex items-center justify-center gap-2 border-2 border-green-400"
                            >
                                <Calculator className="w-6 h-6" />
                                <span className="text-lg">Calcular Investimento 📈</span>
                            </button>
                            <button
                                onClick={() => {
                                    setValorInicial("");
                                    setAporteMensal("");
                                    setTaxaJuros("");
                                    setTempoInvestimento("");
                                    setShowResult(false);
                                }}
                                className="py-3 px-5 rounded-xl border bg-white hover:bg-gray-100 transition"
                            >
                                Limpar
                            </button>
                        </div>
                    </section>

                    {/* Resultados */}
                    <section className="relative bg-white/90 p-4 sm:p-6 rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.4)] overflow-hidden text-gray-900 w-full">
                        <AnimatePresence>
                            {!showResult && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <h2 className="text-xl sm:text-2xl font-bold mb-3 text-green-700">
                                        Seus resultados 📊
                                    </h2>
                                    <p className="text-gray-700 text-sm sm:text-base">
                                        Preencha os dados e clique em <span className="font-bold">Calcular Investimento 📈</span> para ver o potencial de crescimento.
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <AnimatePresence>
                            {showResult && result && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
                                        <h2 className="text-2xl sm:text-3xl font-extrabold text-green-600 drop-shadow-[0_0_6px_#00ff00]">
                                            Resultado Final 💰
                                        </h2>
                                        <div className="text-right text-sm sm:text-base">
                                            <p>Período: <strong>{result.tempoInvestimento} anos</strong></p>
                                            <p>Taxa: <strong>{result.taxaJuros}% a.a.</strong></p>
                                        </div>
                                    </div>

                                    <div className="mt-4 grid grid-cols-1 gap-3">
                                        <div className="p-3 bg-blue-50 rounded-lg">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-blue-800">Valor Investido Total</span>
                                                <span className="font-semibold text-blue-600">
                                                    R$ {result.valorInvestidoTotal.toLocaleString("pt-BR")}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="p-3 bg-green-50 rounded-lg">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-green-800">Juros Compostos</span>
                                                <span className="font-semibold text-green-600">
                                                    R$ {result.jurosCompostos.toLocaleString("pt-BR")}
                                                </span>
                                            </div>
                                        </div>

                                        <motion.div className="p-4 rounded-xl bg-gradient-to-r from-green-200 to-green-400 flex flex-col sm:flex-row items-center justify-between mt-2 shadow-lg gap-3">
                                            <div>
                                                <p className="text-sm text-gray-700">Valor Final</p>
                                                <p className="text-3xl sm:text-4xl font-extrabold text-green-700 drop-shadow-[0_0_6px_#00ff00]">
                                                    R$ {result.valorFinal.toLocaleString("pt-BR")}
                                                </p>
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => window.print()}
                                                    className="px-4 py-2 rounded-lg border bg-white"
                                                >
                                                    Imprimir
                                                </button>
                                            </div>
                                        </motion.div>

                                        <div className="p-3 bg-yellow-50 rounded-lg">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-yellow-800">Rendimento sobre o investido</span>
                                                <span className="font-semibold text-yellow-600">
                                                    {result.rendimentoPercentual.toFixed(1)}%
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </section>
                </main>

                {/* Gráfico de Evolução */}
                <AnimatePresence>
                    {showResult && result && chartData && (
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ delay: 0.3 }}
                            className="max-w-5xl mx-auto mt-8"
                        >
                            <div className="bg-white/90 p-4 sm:p-6 rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                                <h2 className="text-xl sm:text-2xl font-bold mb-4 text-green-700 text-center">
                                    Evolução do Investimento ao Longo do Tempo 📊
                                </h2>
                                <InvestmentChart 
                                    data={chartData} 
                                    title="Crescimento do Patrimônio"
                                />
                                <p className="text-xs text-gray-500 mt-4 text-center italic">
                                    * O gráfico mostra a evolução anual do investimento, valor investido e juros compostos acumulados.
                                </p>
                            </div>
                        </motion.section>
                    )}
                </AnimatePresence>
            </div>

            {/* Seção de conteúdo */}
            <section className="max-w-4xl mx-auto px-4 py-12 text-gray-800">
                <h2 className="text-2xl font-bold mb-6">
                    O que são Juros Compostos?
                </h2>
                <p className="mb-4">
                    Os <strong>juros compostos</strong> são considerados a "oitava maravilha do mundo" por Albert Einstein. Eles funcionam de forma que os juros ganhos em um período são adicionados ao capital inicial, e no próximo período, os juros são calculados sobre esse novo valor (capital + juros anteriores).
                </p>
                <p className="mb-6">
                    Isso significa que seu dinheiro cresce de forma exponencial ao longo do tempo, especialmente quando você faz aportes regulares e deixa o tempo trabalhar a seu favor.
                </p>

                <h3 className="text-xl font-semibold mb-4">
                    Fórmula dos Juros Compostos
                </h3>
                <p className="mb-4">
                    A fórmula básica dos juros compostos é:
                </p>
                <div className="bg-gray-100 p-4 rounded-lg mb-4">
                    <code className="text-sm">
                        M = C × (1 + i)^t
                    </code>
                </div>
                <p className="mb-4">Onde:</p>
                <ul className="list-disc list-inside mb-6 space-y-1">
                    <li><strong>M</strong> = Montante (valor final)</li>
                    <li><strong>C</strong> = Capital inicial</li>
                    <li><strong>i</strong> = Taxa de juros (em decimal)</li>
                    <li><strong>t</strong> = Tempo (em anos)</li>
                </ul>

                <h3 className="text-xl font-semibold mb-4">Tipos de Investimentos</h3>
                <p className="mb-4">Alguns investimentos que utilizam juros compostos:</p>
                <ul className="list-disc list-inside mb-6 space-y-1">
                    <li><strong>Poupança:</strong> Taxa básica, baixo risco</li>
                    <li><strong>CDB:</strong> Certificado de Depósito Bancário</li>
                    <li><strong>Tesouro Direto:</strong> Títulos do governo federal</li>
                    <li><strong>Fundos de Investimento:</strong> Diversificados por gestores</li>
                    <li><strong>Ações:</strong> Participação em empresas (maior risco)</li>
                </ul>

                <h3 className="text-xl font-semibold mb-4">Dicas para Maximizar os Juros Compostos</h3>
                <ul className="list-disc list-inside mb-6 space-y-1">
                    <li>Comece a investir o mais cedo possível</li>
                    <li>Faça aportes regulares (mensais)</li>
                    <li>Reinvista os juros ganhos</li>
                    <li>Mantenha a disciplina e não retire o dinheiro</li>
                    <li>Diversifique seus investimentos</li>
                </ul>

                <h3 className="text-xl font-semibold mb-4">Importante saber</h3>
                <p className="mb-4">
                    Esta calculadora é uma ferramenta informativa e não substitui uma consulta com um consultor financeiro. Os resultados são estimativas baseadas nas informações fornecidas.
                </p>
                <p className="mb-8">
                    Lembre-se: investimentos sempre envolvem riscos. Consulte sempre um profissional qualificado antes de tomar decisões de investimento.
                </p>
            </section>
        </div>
    );
}
