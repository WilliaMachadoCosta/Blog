"use client";

import { useState, useMemo } from "react";

export function usePrecoJustoAcoes() {
    const [precoAtual, setPrecoAtual] = useState("");
    const [lucroPorAcao, setLucroPorAcao] = useState("");
    const [crescimentoEsperado, setCrescimentoEsperado] = useState("");
    const [taxaDesconto, setTaxaDesconto] = useState("");
    const [showResult, setShowResult] = useState(false);

    const result = useMemo(() => {
        const precoAtualNum = Number(precoAtual) || 0;
        const lpaNum = Number(lucroPorAcao) || 0;
        const crescimentoNum = Number(crescimentoEsperado) || 0;
        const taxaDescontoNum = Number(taxaDesconto) || 0;

        if (precoAtualNum === 0 || lpaNum === 0 || taxaDescontoNum === 0) return null;

        // Converter percentuais para decimais
        const crescimentoDecimal = crescimentoNum / 100;
        const taxaDescontoDecimal = taxaDescontoNum / 100;

        // Calcular preço justo usando o Modelo de Gordon
        // Fórmula: Preço Justo = (LPA × (1 + Crescimento)) / (Taxa de Desconto - Crescimento)
        let precoJusto = 0;
        
        if (taxaDescontoDecimal > crescimentoDecimal) {
            precoJusto = (lpaNum * (1 + crescimentoDecimal)) / (taxaDescontoDecimal - crescimentoDecimal);
        } else {
            // Se a taxa de desconto for menor ou igual ao crescimento, usar uma abordagem simplificada
            precoJusto = lpaNum * (1 + crescimentoDecimal) / 0.01; // Usar 1% como taxa mínima
        }

        // Calcular P/L (Price-to-Earnings)
        const peRatio = precoAtualNum / lpaNum;

        // Calcular margem de segurança
        const margemSeguranca = ((precoJusto - precoAtualNum) / precoJusto) * 100;

        // Calcular potencial de ganho
        const potencialGanho = ((precoJusto - precoAtualNum) / precoAtualNum) * 100;

        // Determinar recomendação
        let recomendacao = "NEUTRO";
        if (margemSeguranca > 20) {
            recomendacao = "COMPRAR";
        } else if (margemSeguranca < -20) {
            recomendacao = "VENDER";
        }

        return {
            precoAtual: precoAtualNum,
            precoJusto: +precoJusto.toFixed(2),
            peRatio: +peRatio.toFixed(2),
            margemSeguranca: +margemSeguranca.toFixed(2),
            potencialGanho: +potencialGanho.toFixed(2),
            recomendacao,
            lpa: lpaNum,
            crescimento: crescimentoNum,
            taxaDesconto: taxaDescontoNum
        };
    }, [precoAtual, lucroPorAcao, crescimentoEsperado, taxaDesconto]);

    // Gerar dados para o gráfico
    const chartData = useMemo(() => {
        if (!result) return null;

        return {
            labels: ['Preço Atual', 'Preço Justo'],
            datasets: [
                {
                    label: 'Valor da Ação (R$)',
                    data: [result.precoAtual, result.precoJusto],
                    backgroundColor: [
                        result.precoAtual < result.precoJusto ? 'rgba(34, 197, 94, 0.8)' : 'rgba(239, 68, 68, 0.8)',
                        'rgba(59, 130, 246, 0.8)'
                    ],
                    borderColor: [
                        result.precoAtual < result.precoJusto ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)',
                        'rgb(59, 130, 246)'
                    ],
                    borderWidth: 3,
                    borderRadius: 8,
                    borderSkipped: false,
                }
            ]
        };
    }, [result]);

    return {
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
    };
}
