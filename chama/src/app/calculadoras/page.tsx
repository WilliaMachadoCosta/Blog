// app/calculadoras/page.tsx
"use client";

import GoogleAd from "@/components/banner/google-ads";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calculator, TrendingUp, FileText, DollarSign, BarChart3, Users } from "lucide-react";

const calculadoras = [
    {
        title: "Calculadora de Rescisão",
        description: "Calcule sua rescisão trabalhista com FGTS, férias, 13º salário e multa de 40%.",
        url: "/calculadora-rescisao",
        icon: Calculator,
        color: "from-purple-500 to-pink-500",
        bgColor: "bg-purple-50",
        textColor: "text-purple-700",
        emoji: "🎰"
    },
    {
        title: "Rescisão sem Carteira Assinada",
        description: "Entenda seus direitos e calcule sua rescisão mesmo trabalhando informalmente.",
        url: "/calculo-de-rescisao-sem-carteira-assinada-entenda-seus-direitos-e-como-calcular",
        icon: FileText,
        color: "from-blue-500 to-cyan-500",
        bgColor: "bg-blue-50",
        textColor: "text-blue-700",
        emoji: "📋"
    },
    {
        title: "Juros Compostos e Investimentos",
        description: "Simule investimentos e veja como seus juros compostos podem crescer ao longo do tempo.",
        url: "/calculadora-juros-compostos-investimentos",
        icon: TrendingUp,
        color: "from-green-500 to-emerald-500",
        bgColor: "bg-green-50",
        textColor: "text-green-700",
        emoji: "📈"
    },
];

export default function CalculadorasPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-700 to-white p-4 sm:p-6 text-white">
            <Head>
                <title>Calculadoras | Chama no Zap</title>
                <meta
                    name="description"
                    content="Encontre todas as calculadoras do Chama no Zap: rescisão trabalhista, juros compostos e investimentos. Ferramentas práticas e gratuitas."
                />
                <meta name="keywords" content="calculadoras, rescisão trabalhista, juros compostos, investimentos, FGTS, férias, 13º salário" />
                <link rel="canonical" href="https://chamanozap.net/calculadoras" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "ItemList",
                            "name": "Calculadoras Chama no Zap",
                            "description": "Ferramentas práticas para cálculos trabalhistas e financeiros",
                            "itemListElement": calculadoras.map((calc, index) => ({
                                "@type": "ListItem",
                                position: index + 1,
                                name: calc.title,
                                url: `https://chamanozap.net${calc.url}`,
                                description: calc.description,
                            })),
                        }),
                    }}
                />
            </Head>

            <div className="max-w-6xl mx-auto mt-6 sm:mt-8">
                {/* Header */}
                <header className="text-center mb-8">
                    <motion.h1 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-center gap-3 text-4xl sm:text-5xl font-extrabold drop-shadow-[0_0_10px_rgba(255,255,255,0.9)] mb-4"
                    >
                        <Calculator className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-300" />
                        Calculadoras
                        <BarChart3 className="w-8 h-8 sm:w-10 sm:h-10 text-pink-200" />
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg sm:text-xl text-yellow-200 max-w-3xl mx-auto"
                    >
                        Ferramentas práticas para cálculos trabalhistas e financeiros. 
                        Simule, calcule e planeje seu futuro com nossas calculadoras gratuitas!
                    </motion.p>
                </header>

                <GoogleAd />

                {/* Bloco explicativo */}
                <motion.section 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white/90 text-gray-900 p-6 rounded-2xl shadow mb-8"
                >
                    <h2 className="text-xl font-bold mb-3 text-center">Por que usar nossas calculadoras?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                        <div className="p-4">
                            <DollarSign className="w-8 h-8 mx-auto mb-2 text-green-600" />
                            <h3 className="font-semibold mb-1">100% Gratuitas</h3>
                            <p className="text-sm text-gray-600">Use quantas vezes quiser, sem custos</p>
                        </div>
                        <div className="p-4">
                            <Users className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                            <h3 className="font-semibold mb-1">Fáceis de Usar</h3>
                            <p className="text-sm text-gray-600">Interface intuitiva e resultados instantâneos</p>
                        </div>
                        <div className="p-4">
                            <TrendingUp className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                            <h3 className="font-semibold mb-1">Precisas</h3>
                            <p className="text-sm text-gray-600">Cálculos baseados na legislação vigente</p>
                        </div>
                    </div>
                </motion.section>

                {/* Grid de Calculadoras */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {calculadoras.map((calc, idx) => {
                        const IconComponent = calc.icon;
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 + idx * 0.1 }}
                            >
                                <Link href={calc.url}>
                                    <div className="group bg-white/90 hover:bg-white transition-all duration-300 p-6 rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:shadow-[0_0_30px_rgba(255,255,255,0.6)] transform hover:scale-105">
                                        {/* Header do Card */}
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className={`p-3 rounded-xl bg-gradient-to-r ${calc.color} text-white`}>
                                                <IconComponent className="w-6 h-6" />
                                            </div>
                                            <span className="text-2xl">{calc.emoji}</span>
                                        </div>

                                        {/* Conteúdo */}
                                        <h3 className={`text-xl font-bold mb-3 ${calc.textColor}`}>
                                            {calc.title}
                                        </h3>
                                        <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                                            {calc.description}
                                        </p>

                                        {/* Botão de Ação */}
                                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${calc.bgColor} ${calc.textColor} font-semibold text-sm group-hover:scale-105 transition-transform`}>
                                            <span>Acessar Calculadora</span>
                                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Seção de Destaque */}
                <motion.section 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="mt-12 bg-gradient-to-r from-green-500 to-blue-500 text-white p-8 rounded-2xl text-center"
                >
                    <h2 className="text-2xl font-bold mb-4">Precisa de Ajuda?</h2>
                    <p className="text-lg mb-6 opacity-90">
                        Nossas calculadoras são ferramentas educativas. Para questões específicas, 
                        consulte sempre um profissional qualificado.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                            <h3 className="font-semibold">Advogado Trabalhista</h3>
                            <p className="text-sm opacity-80">Para questões de rescisão</p>
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                            <h3 className="font-semibold">Consultor Financeiro</h3>
                            <p className="text-sm opacity-80">Para investimentos</p>
                        </div>
                    </div>
                </motion.section>
            </div>
        </div>
    );
}
