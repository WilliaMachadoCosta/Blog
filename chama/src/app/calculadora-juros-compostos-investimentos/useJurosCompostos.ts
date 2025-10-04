"use client";

import { useState, useMemo } from "react";

export function useJurosCompostos() {
    const [valorInicial, setValorInicial] = useState("");
    const [aporteMensal, setAporteMensal] = useState("");
    const [taxaJuros, setTaxaJuros] = useState("");
    const [tempoInvestimento, setTempoInvestimento] = useState("");
    const [showResult, setShowResult] = useState(false);

    const result = useMemo(() => {
        const valorInicialNum = Number(valorInicial) || 0;
        const aporteMensalNum = Number(aporteMensal) || 0;
        const taxaJurosNum = Number(taxaJuros) || 0;
        const tempoInvestimentoNum = Number(tempoInvestimento) || 0;

        if (tempoInvestimentoNum === 0) return null;

        // Converter taxa anual para mensal
        const taxaMensal = taxaJurosNum / 100 / 12;
        const totalMeses = tempoInvestimentoNum * 12;

        // Calcular valor final com juros compostos
        // Fórmula: M = C × (1 + i)^t + PMT × [((1 + i)^t - 1) / i]
        // Onde: C = valor inicial, PMT = aporte mensal, i = taxa mensal, t = total de meses

        let valorFinal = 0;
        let valorInvestidoTotal = valorInicialNum;

        // Valor inicial com juros compostos
        if (valorInicialNum > 0) {
            valorFinal += valorInicialNum * Math.pow(1 + taxaMensal, totalMeses);
        }

        // Aportes mensais com juros compostos
        if (aporteMensalNum > 0 && taxaMensal > 0) {
            const valorAportes = aporteMensalNum * ((Math.pow(1 + taxaMensal, totalMeses) - 1) / taxaMensal);
            valorFinal += valorAportes;
            valorInvestidoTotal += aporteMensalNum * totalMeses;
        } else if (aporteMensalNum > 0 && taxaMensal === 0) {
            // Se não há juros, apenas soma os aportes
            valorFinal += aporteMensalNum * totalMeses;
            valorInvestidoTotal += aporteMensalNum * totalMeses;
        }

        const jurosCompostos = valorFinal - valorInvestidoTotal;
        const rendimentoPercentual = valorInvestidoTotal > 0 ? (jurosCompostos / valorInvestidoTotal) * 100 : 0;

        return {
            valorFinal: +valorFinal.toFixed(2),
            valorInvestidoTotal: +valorInvestidoTotal.toFixed(2),
            jurosCompostos: +jurosCompostos.toFixed(2),
            rendimentoPercentual: +rendimentoPercentual.toFixed(2),
            tempoInvestimento: tempoInvestimentoNum,
            taxaJuros: taxaJurosNum,
            totalMeses,
            taxaMensal: +(taxaMensal * 100).toFixed(4)
        };
    }, [valorInicial, aporteMensal, taxaJuros, tempoInvestimento]);

    // Gerar dados para o gráfico
    const chartData = useMemo(() => {
        const valorInicialNum = Number(valorInicial) || 0;
        const aporteMensalNum = Number(aporteMensal) || 0;
        const taxaJurosNum = Number(taxaJuros) || 0;
        const tempoInvestimentoNum = Number(tempoInvestimento) || 0;

        if (tempoInvestimentoNum === 0) return null;

        const taxaMensal = taxaJurosNum / 100 / 12;
        const labels: string[] = [];
        const valorAcumuladoData: number[] = [];
        const valorInvestidoData: number[] = [];
        const jurosData: number[] = [];

        // Gerar dados para cada ano
        for (let ano = 0; ano <= tempoInvestimentoNum; ano++) {
            const meses = ano * 12;
            labels.push(`${ano} ano${ano !== 1 ? 's' : ''}`);

            let valorAcumulado = 0;
            let valorInvestido = valorInicialNum;

            // Valor inicial com juros compostos
            if (valorInicialNum > 0) {
                valorAcumulado += valorInicialNum * Math.pow(1 + taxaMensal, meses);
            }

            // Aportes mensais com juros compostos
            if (aporteMensalNum > 0 && taxaMensal > 0) {
                const valorAportes = aporteMensalNum * ((Math.pow(1 + taxaMensal, meses) - 1) / taxaMensal);
                valorAcumulado += valorAportes;
                valorInvestido += aporteMensalNum * meses;
            } else if (aporteMensalNum > 0 && taxaMensal === 0) {
                valorAcumulado += aporteMensalNum * meses;
                valorInvestido += aporteMensalNum * meses;
            }

            const juros = valorAcumulado - valorInvestido;

            valorAcumuladoData.push(+valorAcumulado.toFixed(2));
            valorInvestidoData.push(+valorInvestido.toFixed(2));
            jurosData.push(+juros.toFixed(2));
        }

        return {
            labels,
            datasets: [
                {
                    label: 'Valor Investido',
                    data: valorInvestidoData,
                    borderColor: 'rgb(59, 130, 246)',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    fill: true,
                    tension: 0.4,
                    borderWidth: 3,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                },
                {
                    label: 'Valor Acumulado',
                    data: valorAcumuladoData,
                    borderColor: 'rgb(16, 185, 129)',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    fill: true,
                    tension: 0.4,
                    borderWidth: 3,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                },
                {
                    label: 'Juros Compostos',
                    data: jurosData,
                    borderColor: 'rgb(245, 158, 11)',
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    fill: true,
                    tension: 0.4,
                    borderWidth: 3,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                }
            ]
        };
    }, [valorInicial, aporteMensal, taxaJuros, tempoInvestimento]);

    return {
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
    };
}
