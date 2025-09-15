'use client';

import { useState } from "react";

export default function CalculatorClient() {
    const [salario, setSalario] = useState(0);
    const [diasTrabalhados, setDiasTrabalhados] = useState(0);
    const [mesesTrabalhados, setMesesTrabalhados] = useState(0);
    const [resultado, setResultado] = useState<any | null>(null);

    const calcular = () => {
        const salarioProporcional = (salario / 30) * diasTrabalhados;
        const feriasProporcionais = (salario / 12) * mesesTrabalhados * 1.33;
        const decimoTerceiro = (salario / 12) * mesesTrabalhados;

        const total = salarioProporcional + feriasProporcionais + decimoTerceiro;

        setResultado({
            salarioProporcional,
            feriasProporcionais,
            decimoTerceiro,
            total
        });
    };

    return (
        <main className="min-h-screen bg-[#f5f3ef] py-6 px-4 text-black">
            <article className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6 space-y-6">
                <h1 className="text-2xl sm:text-3xl font-bold leading-tight">
                    Cálculo de Rescisão sem Carteira Assinada: Entenda seus Direitos e Como Calcular
                </h1>

                <p>
                    O cálculo da rescisão de um contrato de trabalho sem carteira assinada é um tema que gera muitas dúvidas. Aqui você encontra um simulador prático.
                </p>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Salário Mensal (R$)</label>
                        <input
                            type="number"
                            className="w-full border rounded-md px-3 py-2"
                            value={salario}
                            onChange={(e) => setSalario(Number(e.target.value))}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Dias Trabalhados no Mês</label>
                        <input
                            type="number"
                            className="w-full border rounded-md px-3 py-2"
                            value={diasTrabalhados}
                            onChange={(e) => setDiasTrabalhados(Number(e.target.value))}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Meses Trabalhados</label>
                        <input
                            type="number"
                            className="w-full border rounded-md px-3 py-2"
                            value={mesesTrabalhados}
                            onChange={(e) => setMesesTrabalhados(Number(e.target.value))}
                        />
                    </div>
                    <button
                        onClick={calcular}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                    >
                        Calcular
                    </button>
                </div>

                {resultado && (
                    <div className="mt-6 bg-gray-50 p-4 rounded-md">
                        <h3 className="text-lg font-semibold mb-2">Resultado do Cálculo</h3>
                        <p>Salário Proporcional: R$ {resultado.salarioProporcional.toFixed(2)}</p>
                        <p>Férias Proporcionais (1/3 incluído): R$ {resultado.feriasProporcionais.toFixed(2)}</p>
                        <p>13º Salário Proporcional: R$ {resultado.decimoTerceiro.toFixed(2)}</p>
                        <hr className="my-2" />
                        <p className="font-bold text-lg">Total: R$ {resultado.total.toFixed(2)}</p>
                    </div>
                )}
            </article>
        </main>
    );
}
