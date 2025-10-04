'use client';

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Calculator, DollarSign, Calendar, Clock } from "lucide-react";

export default function CalculatorClient() {
    const [salario, setSalario] = useState("");
    const [diasTrabalhados, setDiasTrabalhados] = useState("");
    const [mesesTrabalhados, setMesesTrabalhados] = useState("");
    const [resultado, setResultado] = useState<any | null>(null);
    const [showResult, setShowResult] = useState(false);

    const calcular = () => {
        const salarioNum = Number(salario) || 0;
        const diasNum = Number(diasTrabalhados) || 0;
        const mesesNum = Number(mesesTrabalhados) || 0;

        const salarioProporcional = (salarioNum / 30) * diasNum;
        const feriasProporcionais = (salarioNum / 12) * mesesNum * 1.33;
        const decimoTerceiro = (salarioNum / 12) * mesesNum;

        const total = salarioProporcional + feriasProporcionais + decimoTerceiro;

        setResultado({
            salarioProporcional,
            feriasProporcionais,
            decimoTerceiro,
            total
        });
        setShowResult(true);
    };

    const limpar = () => {
        setSalario("");
        setDiasTrabalhados("");
        setMesesTrabalhados("");
        setResultado(null);
        setShowResult(false);
    };

    return (
        <div className="space-y-6">
            {/* Formulário */}
            <div className="space-y-4">
                <div className="flex flex-col">
                    <label className="text-sm mb-2 flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-green-600" />
                        Salário Mensal (R$)
                    </label>
                    <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        value={salario}
                        onChange={(e) => setSalario(e.target.value)}
                        placeholder="Digite seu salário mensal"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm mb-2 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-blue-600" />
                        Dias Trabalhados no Mês
                    </label>
                    <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        value={diasTrabalhados}
                        onChange={(e) => setDiasTrabalhados(e.target.value)}
                        placeholder="Ex: 20 dias"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm mb-2 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-purple-600" />
                        Meses Trabalhados
                    </label>
                    <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        value={mesesTrabalhados}
                        onChange={(e) => setMesesTrabalhados(e.target.value)}
                        placeholder="Ex: 6 meses"
                    />
                </div>

                {/* Botões */}
                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                    <button
                        onClick={calcular}
                        className="flex-1 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-yellow-400 text-white font-extrabold shadow-[0_0_15px_rgba(255,255,255,0.7)] hover:scale-105 active:scale-95 transition transform animate-pulse flex items-center justify-center gap-2"
                    >
                        <Calculator className="w-5 h-5" />
                        Calcular Rescisão 🧮
                    </button>
                    <button
                        onClick={limpar}
                        className="py-3 px-5 rounded-xl border bg-white hover:bg-gray-100 transition"
                    >
                        Limpar
                    </button>
                </div>
            </div>

            {/* Resultados */}
            <AnimatePresence>
                {showResult && resultado && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-2xl border border-green-200"
                    >
                        <h3 className="text-lg font-bold mb-4 text-green-700 flex items-center gap-2">
                            <Calculator className="w-5 h-5" />
                            Resultado do Cálculo
                        </h3>
                        
                        <div className="space-y-3">
                            <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                                <span className="text-sm text-gray-600">Salário Proporcional</span>
                                <span className="font-semibold text-green-600">
                                    R$ {resultado.salarioProporcional.toFixed(2)}
                                </span>
                            </div>
                            
                            <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                                <span className="text-sm text-gray-600">Férias Proporcionais (1/3 incluído)</span>
                                <span className="font-semibold text-blue-600">
                                    R$ {resultado.feriasProporcionais.toFixed(2)}
                                </span>
                            </div>
                            
                            <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                                <span className="text-sm text-gray-600">13º Salário Proporcional</span>
                                <span className="font-semibold text-purple-600">
                                    R$ {resultado.decimoTerceiro.toFixed(2)}
                                </span>
                            </div>
                            
                            <div className="border-t pt-3 mt-4">
                                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-200 to-green-400 rounded-xl">
                                    <span className="text-lg font-bold text-green-800">Total Estimado</span>
                                    <span className="text-2xl font-extrabold text-green-700">
                                        R$ {resultado.total.toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <p className="text-xs text-gray-500 mt-4 italic">
                            * Este cálculo é estimativo e serve como referência. Consulte um advogado trabalhista para valores oficiais.
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            {!showResult && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-8 text-gray-500"
                >
                    <Calculator className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p className="text-sm">
                        Preencha os dados e clique em <span className="font-bold text-purple-600">Calcular Rescisão 🧮</span> para ver seus direitos.
                    </p>
                </motion.div>
            )}
        </div>
    );
}
