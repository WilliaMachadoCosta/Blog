"use client";

import Head from "next/head";
import { AnimatePresence, motion } from "framer-motion";
import { TrendingUp, Calculator, DollarSign, BarChart3, Target, Zap, Star } from "lucide-react";
import { usePrecoJustoAcoes } from "./usePrecoJustoAcoes";
import GoogleAd from "@/components/banner/google-ads";
import StockChart from "@/components/charts/StockChart";
import Script from 'next/script';
import GoogleAdsense from "@/components/banner/googleAdsense";

export default function CalculadoraPrecoJustoAcoes() {
    const {
        precoAtual,
        setPrecoAtual,
        lucroPorAcao,
        setLucroPorAcao,
        crescimentoEsperado,
        setCrescimentoEsperado,
        taxaDesconto,
        setTaxaDesconto,
        showResult,
        setShowResult,
        result,
        chartData
    } = usePrecoJustoAcoes();

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-700 to-white p-4 sm:p-6 text-white">
            <Head>
                <title>Calculadora de Preço Justo de Ações 📊 | Chama no Zap</title>
                <meta name="description" content="Descubra o preço justo de qualquer ação com nossa calculadora. Simule investimentos e tome decisões mais inteligentes no mercado de ações." />
                <meta name="keywords" content="preço justo ações, calculadora ações, valor intrínseco, investimentos, bolsa de valores, análise fundamentalista" />
                <link rel="canonical" href="https://chamanozap.net/calculadora-preco-justo-acoes" />
            </Head>

            {/* JSON-LD para dados estruturados */}
            <Script
                id="ld-json"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Article",
                        headline: "Calculadora de Preço Justo de Ações",
                        description: "Descubra o preço justo de qualquer ação com nossa calculadora. Simule investimentos e tome decisões mais inteligentes no mercado de ações.",
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
                            "@id": "https://chamanozap.net/calculadora-preco-justo-acoes",
                        },
                        datePublished: "2025-01-17T12:00:00Z",
                        dateModified: "2025-01-17T12:00:00Z",
                    }),
                }}
            />

            <div className="max-w-6xl mx-auto mt-6 sm:mt-8">
                {/* Header */}
                <header className="text-center mb-8">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-center gap-3 text-4xl sm:text-5xl font-extrabold drop-shadow-[0_0_10px_rgba(255,255,255,0.9)] mb-4"
                    >
                        <Target className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-300" />
                        Preço Justo de Ações
                        <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 text-green-300" />
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg sm:text-xl text-white max-w-4xl mx-auto font-medium"
                    >
                        🚀 <strong>Descubra o valor real de qualquer ação!</strong> Nossa calculadora revela se uma empresa está
                        subvalorizada ou supervalorizada, te dando a vantagem que você precisa para investir com confiança.
                    </motion.p>
                </header>

                <div className="mt-6 mb-6">
                    <p className="text-[10px] text-gray-500 text-center mb-2">Publicidade</p>
                    <GoogleAdsense
                        slot="9825364292"
                        className=" shadow-lg  rounded-xl"
                    />
                </div>

                {/* Copy Persuasivo */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-6 rounded-2xl shadow-lg mb-8"
                >
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2">
                            <Zap className="w-6 h-6" />
                            Por que você PRECISA saber o preço justo?
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                                <h3 className="font-bold text-lg mb-2">💰 Evite Perdas</h3>
                                <p className="text-sm text-white font-medium">
                                    Não compre ações caras! Descubra quando uma empresa está supervalorizada
                                    e evite investimentos que podem te dar prejuízo.
                                </p>
                            </div>
                            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                                <h3 className="font-bold text-lg mb-2">🎯 Encontre Oportunidades</h3>
                                <p className="text-sm text-white font-medium">
                                    Identifique ações subvalorizadas antes dos outros investidores.
                                    Seja o primeiro a descobrir grandes oportunidades!
                                </p>
                            </div>
                            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                                <h3 className="font-bold text-lg mb-2">📈 Maximize Lucros</h3>
                                <p className="text-sm text-white font-medium">
                                    Invista no momento certo, no preço certo. Nossa calculadora te ajuda
                                    a tomar decisões mais inteligentes e lucrativas.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* Main grid */}
                <main className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
                    {/* Formulário */}
                    <section className="bg-white/90 text-gray-900 p-6 rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.4)] w-full">
                        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-blue-700 flex items-center gap-2">
                            <Calculator className="w-6 h-6" />
                            Calcule o Preço Justo
                        </h2>

                        {/* Preço Atual */}
                        <div className="flex flex-col mb-4">
                            <label className="text-sm mb-2 flex items-center gap-2">
                                <DollarSign className="w-4 h-4 text-green-600" />
                                Preço Atual da Ação (R$)
                            </label>
                            <input
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                value={precoAtual}
                                onChange={(e) => setPrecoAtual(e.target.value)}
                                placeholder="Ex: 25.50"
                                className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Lucro por Ação */}
                        <div className="flex flex-col mb-4">
                            <label className="text-sm mb-2 flex items-center gap-2">
                                <TrendingUp className="w-4 h-4 text-blue-600" />
                                Lucro por Ação - LPA (R$)
                            </label>
                            <input
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                value={lucroPorAcao}
                                onChange={(e) => setLucroPorAcao(e.target.value)}
                                placeholder="Ex: 2.30"
                                className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Crescimento Esperado */}
                        <div className="flex flex-col mb-4">
                            <label className="text-sm mb-2 flex items-center gap-2">
                                <BarChart3 className="w-4 h-4 text-purple-600" />
                                Crescimento Esperado Anual (%)
                            </label>
                            <input
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                value={crescimentoEsperado}
                                onChange={(e) => setCrescimentoEsperado(e.target.value)}
                                placeholder="Ex: 15"
                                className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Taxa de Desconto */}
                        <div className="flex flex-col mb-4">
                            <label className="text-sm mb-2 flex items-center gap-2">
                                <Target className="w-4 h-4 text-orange-600" />
                                Taxa de Desconto (%)
                            </label>
                            <input
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                value={taxaDesconto}
                                onChange={(e) => setTaxaDesconto(e.target.value)}
                                placeholder="Ex: 12"
                                className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Botões */}
                        <div className="flex flex-col sm:flex-row gap-3 mt-6">
                            <button
                                onClick={() => {
                                    setShowResult(true);
                                    window.scrollTo({ top: 0, behavior: "smooth" });
                                }}
                                className="flex-1 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-green-500 text-white font-extrabold shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:shadow-[0_0_25px_rgba(59,130,246,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 transform flex items-center justify-center gap-2 border-2 border-blue-400"
                            >
                                <Calculator className="w-6 h-6" />
                                <span className="text-lg">Calcular Preço Justo 🎯</span>
                            </button>
                            <button
                                onClick={() => {
                                    setPrecoAtual("");
                                    setLucroPorAcao("");
                                    setCrescimentoEsperado("");
                                    setTaxaDesconto("");
                                    setShowResult(false);
                                }}
                                className="py-4 px-5 rounded-xl border bg-white hover:bg-gray-100 transition"
                            >
                                Limpar
                            </button>
                        </div>
                    </section>

                    {/* Resultados */}
                    <section className="relative bg-white/90 p-6 rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.4)] overflow-hidden text-gray-900 w-full">
                        <AnimatePresence>
                            {!showResult && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="text-center py-8"
                                >
                                    <Target className="w-16 h-16 mx-auto mb-4 text-blue-300" />
                                    <h2 className="text-xl sm:text-2xl font-bold mb-3 text-blue-700">
                                        Descubra o Valor Real 🎯
                                    </h2>
                                    <p className="text-gray-700 text-sm sm:text-base">
                                        Preencha os dados da ação e clique em <span className="font-bold text-blue-600">Calcular Preço Justo 🎯</span> para descobrir se é uma boa oportunidade de investimento.
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
                                        <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-600 drop-shadow-[0_0_6px_#3b82f6]">
                                            Análise da Ação 📊
                                        </h2>
                                        <div className="text-right text-sm sm:text-base">
                                            <p>P/L: <strong>{result.peRatio.toFixed(2)}</strong></p>
                                            <p>Margem: <strong>{result.margemSeguranca.toFixed(1)}%</strong></p>
                                        </div>
                                    </div>

                                    <div className="mt-4 grid grid-cols-1 gap-3">
                                        <div className="p-3 bg-blue-50 rounded-lg">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-blue-800">Preço Atual</span>
                                                <span className="font-semibold text-blue-600">
                                                    R$ {result.precoAtual.toFixed(2)}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="p-3 bg-green-50 rounded-lg">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-green-800">Preço Justo</span>
                                                <span className="font-semibold text-green-600">
                                                    R$ {result.precoJusto.toFixed(2)}
                                                </span>
                                            </div>
                                        </div>

                                        <motion.div className={`p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between mt-2 shadow-lg gap-3 ${result.recomendacao === 'COMPRAR'
                                            ? 'bg-gradient-to-r from-green-200 to-green-400'
                                            : result.recomendacao === 'VENDER'
                                                ? 'bg-gradient-to-r from-red-200 to-red-400'
                                                : 'bg-gradient-to-r from-yellow-200 to-yellow-400'
                                            }`}>
                                            <div>
                                                <p className="text-sm text-gray-700">Recomendação</p>
                                                <p className={`text-2xl sm:text-3xl font-extrabold ${result.recomendacao === 'COMPRAR'
                                                    ? 'text-green-700'
                                                    : result.recomendacao === 'VENDER'
                                                        ? 'text-red-700'
                                                        : 'text-yellow-700'
                                                    }`}>
                                                    {result.recomendacao} {result.recomendacao === 'COMPRAR' ? '🚀' : result.recomendacao === 'VENDER' ? '⚠️' : '⏳'}
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

                                        <div className="p-3 bg-purple-50 rounded-lg">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-purple-800">Potencial de Ganho</span>
                                                <span className={`font-semibold ${result.potencialGanho > 0 ? 'text-green-600' : 'text-red-600'
                                                    }`}>
                                                    {result.potencialGanho > 0 ? '+' : ''}{result.potencialGanho.toFixed(1)}%
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </section>
                </main>

                {/* Gráfico de Análise */}
                <AnimatePresence>
                    {showResult && result && chartData && (
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ delay: 0.3 }}
                            className="max-w-6xl mx-auto mt-8"
                        >
                            <div className="bg-white/90 p-6 rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                                <h2 className="text-xl sm:text-2xl font-bold mb-4 text-blue-700 text-center">
                                    Análise Visual do Preço Justo 📈
                                </h2>
                                <StockChart
                                    data={chartData}
                                    title="Comparação: Preço Atual vs Preço Justo"
                                />
                                <p className="text-xs text-gray-500 mt-4 text-center italic">
                                    * O gráfico mostra a comparação entre o preço atual e o preço justo calculado.
                                </p>
                            </div>
                        </motion.section>
                    )}
                </AnimatePresence>
            </div>

            {/* Seção de conteúdo educativo */}
            <section className="max-w-4xl mx-auto px-4 py-12 text-gray-800">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    Como Calcular o Preço Justo de uma Ação? 💡
                </h2>

                <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-2xl mb-8">
                    <h3 className="text-xl font-bold mb-4 text-blue-700">🎯 Método do Valor Presente dos Dividendos</h3>
                    <p className="mb-4">
                        O preço justo de uma ação é calculado usando o <strong>Modelo de Gordon</strong>,
                        que considera os dividendos futuros descontados ao valor presente. É a forma mais
                        simples e eficaz de determinar se uma ação está cara ou barata.
                    </p>
                    <div className="bg-white p-4 rounded-lg">
                        <h4 className="font-bold mb-2">Fórmula:</h4>
                        <code className="text-sm bg-gray-100 p-2 rounded block">
                            Preço Justo = (LPA × (1 + Crescimento)) / (Taxa de Desconto - Crescimento)
                        </code>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow">
                        <h3 className="text-lg font-bold mb-3 text-green-700">📊 O que é LPA?</h3>
                        <p className="text-sm text-gray-700">
                            <strong>Lucro por Ação (LPA)</strong> é o lucro líquido da empresa dividido pelo número de ações.
                            Mostra quanto a empresa lucra para cada ação que você possui.
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                            <strong>Onde encontrar:</strong> Relatórios trimestrais da empresa, sites como StatusInvest, Fundamentus.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow">
                        <h3 className="text-lg font-bold mb-3 text-blue-700">📈 Crescimento Esperado</h3>
                        <p className="text-sm text-gray-700">
                            É a taxa de crescimento anual esperada dos lucros da empresa.
                            Baseie-se no histórico da empresa e nas perspectivas do setor.
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                            <strong>Como calcular:</strong> Média do crescimento dos últimos 5 anos ou projeções da empresa.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow">
                        <h3 className="text-lg font-bold mb-3 text-purple-700">🎯 Taxa de Desconto</h3>
                        <p className="text-sm text-gray-700">
                            É o retorno mínimo que você espera do investimento.
                            Geralmente entre 10% a 15% para ações brasileiras.
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                            <strong>Como definir:</strong> CDI + prêmio de risco (3% a 8%) ou Selic + prêmio.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow">
                        <h3 className="text-lg font-bold mb-3 text-orange-700">⚖️ Margem de Segurança</h3>
                        <p className="text-sm text-gray-700">
                            A diferença entre o preço justo e o preço atual.
                            Quanto maior, mais segura é a oportunidade de investimento.
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                            <strong>Recomendação:</strong> Margem acima de 20% indica boa oportunidade.
                        </p>
                    </div>
                </div>

                {/* Seção Detalhada sobre Como Encontrar os Dados */}
                <div className="bg-gradient-to-r from-blue-50 to-green-50 p-8 rounded-2xl mb-8">
                    <h3 className="text-2xl font-bold mb-6 text-center text-blue-700">
                        🔍 Como Encontrar os Dados Necessários?
                    </h3>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Crescimento Esperado */}
                        <div className="bg-white p-6 rounded-xl shadow">
                            <h4 className="text-xl font-bold mb-4 text-blue-700 flex items-center gap-2">
                                <TrendingUp className="w-5 h-5" />
                                Crescimento Esperado
                            </h4>

                            <div className="space-y-4">
                                <div>
                                    <h5 className="font-semibold text-gray-800 mb-2">📊 Método 1: Histórico da Empresa</h5>
                                    <p className="text-sm text-gray-700 mb-2">
                                        Calcule a média de crescimento dos lucros dos últimos 5 anos:
                                    </p>
                                    <div className="bg-gray-100 p-3 rounded-lg">
                                        <code className="text-xs">
                                            Crescimento = ((LPA atual / LPA 5 anos atrás)^(1/5) - 1) × 100
                                        </code>
                                    </div>
                                </div>

                                <div>
                                    <h5 className="font-semibold text-gray-800 mb-2">📈 Método 2: Projeções da Empresa</h5>
                                    <p className="text-sm text-gray-700">
                                        Use as projeções oficiais da empresa em seus relatórios trimestrais e anuais.
                                    </p>
                                </div>

                                <div>
                                    <h5 className="font-semibold text-gray-800 mb-2">🏭 Método 3: Crescimento do Setor</h5>
                                    <p className="text-sm text-gray-700">
                                        Considere o crescimento médio do setor onde a empresa atua.
                                    </p>
                                </div>

                                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
                                    <p className="text-xs text-yellow-700">
                                        <strong>Dica:</strong> Para empresas estáveis, use 5-10%. Para empresas em crescimento, 10-20%.
                                        Para startups, 20-30% (com mais cautela).
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Taxa de Desconto */}
                        <div className="bg-white p-6 rounded-xl shadow">
                            <h4 className="text-xl font-bold mb-4 text-purple-700 flex items-center gap-2">
                                <Target className="w-5 h-5" />
                                Taxa de Desconto
                            </h4>

                            <div className="space-y-4">
                                <div>
                                    <h5 className="font-semibold text-gray-800 mb-2">💰 Método 1: CDI + Prêmio</h5>
                                    <p className="text-sm text-gray-700 mb-2">
                                        Use a taxa CDI atual + um prêmio de risco:
                                    </p>
                                    <div className="bg-gray-100 p-3 rounded-lg">
                                        <code className="text-xs">
                                            Taxa = CDI + Prêmio de Risco (3% a 8%)
                                        </code>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Exemplo: CDI 12% + 5% = 17% a.a.
                                    </p>
                                </div>

                                <div>
                                    <h5 className="font-semibold text-gray-800 mb-2">🏦 Método 2: Selic + Prêmio</h5>
                                    <p className="text-sm text-gray-700">
                                        Taxa Selic atual + prêmio de risco de 4% a 10%.
                                    </p>
                                </div>

                                <div>
                                    <h5 className="font-semibold text-gray-800 mb-2">📊 Método 3: WACC da Empresa</h5>
                                    <p className="text-sm text-gray-700">
                                        Use o Custo Médio Ponderado de Capital (WACC) da empresa, se disponível.
                                    </p>
                                </div>

                                <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded">
                                    <p className="text-xs text-green-700">
                                        <strong>Recomendação:</strong> Para ações brasileiras, use entre 12% a 18%.
                                        Empresas mais arriscadas = taxa maior. Empresas estáveis = taxa menor.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Fontes de Dados */}
                    <div className="mt-8 bg-white p-6 rounded-xl shadow">
                        <h4 className="text-xl font-bold mb-4 text-center text-gray-800">
                            📚 Onde Encontrar Esses Dados?
                        </h4>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="text-center p-4">
                                <h5 className="font-semibold text-blue-700 mb-2">Sites de Análise</h5>
                                <ul className="text-sm text-gray-700 space-y-1">
                                    <li>• StatusInvest</li>
                                    <li>• Fundamentus</li>
                                    <li>• TradingView</li>
                                    <li>• Yahoo Finance</li>
                                </ul>
                            </div>

                            <div className="text-center p-4">
                                <h5 className="font-semibold text-green-700 mb-2">Relatórios Oficiais</h5>
                                <ul className="text-sm text-gray-700 space-y-1">
                                    <li>• Site da empresa</li>
                                    <li>• CVM (Comissão de Valores)</li>
                                    <li>• B3 (Bolsa de Valores)</li>
                                    <li>• Relatórios trimestrais</li>
                                </ul>
                            </div>

                            <div className="text-center p-4">
                                <h5 className="font-semibold text-purple-700 mb-2">Indicadores Econômicos</h5>
                                <ul className="text-sm text-gray-700 space-y-1">
                                    <li>• Banco Central (CDI/Selic)</li>
                                    <li>• IBGE (crescimento setorial)</li>
                                    <li>• Análises de mercado</li>
                                    <li>• Relatórios de corretoras</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-8 rounded-2xl text-center">
                    <h3 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2">
                        <Star className="w-6 h-6" />
                        Por que Investir em Ações?
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                            <h4 className="font-bold text-lg mb-2">🚀 Alto Potencial</h4>
                            <p className="text-sm text-white font-medium">
                                Ações podem render muito mais que a poupança ou CDB,
                                especialmente em empresas em crescimento.
                            </p>
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                            <h4 className="font-bold text-lg mb-2">💰 Dividendos</h4>
                            <p className="text-sm text-white font-medium">
                                Muitas empresas pagam dividendos mensais ou trimestrais,
                                gerando renda passiva constante.
                            </p>
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                            <h4 className="font-bold text-lg mb-2">📈 Valorização</h4>
                            <p className="text-sm text-white font-medium">
                                Além dos dividendos, suas ações podem se valorizar ao longo do tempo,
                                multiplicando seu investimento.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded">
                    <h3 className="text-lg font-bold mb-2 text-yellow-800">⚠️ Importante</h3>
                    <p className="text-sm text-yellow-700">
                        Esta calculadora é uma ferramenta educativa. O mercado de ações envolve riscos e
                        a análise fundamentalista é apenas uma das ferramentas. Sempre faça sua própria
                        pesquisa e considere consultar um consultor financeiro antes de investir.
                    </p>
                </div>
            </section>
        </div>
    );
}
