"use client";

import Head from "next/head";
import { AnimatePresence, motion } from "framer-motion";
import { Dice6, PartyPopper, Banknote } from "lucide-react";
import { GameBoard } from "@/components/posts-templates/template-game/gameboard";
import { Tile } from "@/components/posts-templates/template-game/tile";
import { useRescisao } from "./useRecisao";
import MoneyRain from "@/components/posts-templates/template-game/money-rain";
import GoogleAd from "@/components/banner/google-ads";
import GoogleAdsense from "@/components/banner/googleAdsense";

export default function CalculadoraRescisaoGame() {
    const {
        salary, setSalary,
        hireDate, setHireDate,
        termDate, setTermDate,
        motive, setMotive,
        aviso, setAviso,
        dependents, setDependents,
        fgtsBefore, setFgtsBefore,
        vacationDays, setVacationDays,
        showResult, setShowResult,
        explode, setExplode,
        confettiRef,
        result
    } = useRescisao();

    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-700 to-white p-4 sm:p-6 text-white">

            <Head>
                <title>Calculadora de Rescisão Trabalhista 🎰 | Chama no Zap</title>
                <meta name="description" content="Use nossa calculadora de rescisão trabalhista e descubra quanto você tem direito: FGTS, férias, 13º, saldo de salário e multa de 40%." />
                <meta name="keywords" content="calculadora rescisão, calcular rescisão trabalhista, simulação rescisão, FGTS, férias, 13º salário" />
                <link rel="canonical" href="https://chamanozap.net/calculadora-rescisao" />
            </Head>

            <div className="max-w-5xl mx-auto mt-6 sm:mt-8">

                {/* Header */}
                <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3 sm:gap-0">
                    <h1 className="flex items-center gap-2 text-3xl sm:text-4xl font-extrabold drop-shadow-[0_0_10px_rgba(255,255,255,0.9)]">
                        <Dice6 className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-300" />
                        Calculadora de Rescisão
                        <PartyPopper className="w-6 h-6 sm:w-8 sm:h-8 text-pink-200" />
                    </h1>
                    <p className="flex items-center gap-2 text-sm sm:text-base text-white font-medium">
                        Descubra quanto você leva no final!
                        <Banknote className="w-5 h-5 text-green-300" />
                    </p>
                </header>

                <GoogleAdsense slot="9825364292" className="border-2 border-amber-600" />

                {/* Bloco explicativo */}
                <section className="bg-white/90 text-gray-900 p-4 sm:p-6 rounded-2xl shadow mb-6">
                    <h2 className="text-lg sm:text-xl font-bold mb-2">Como funciona a calculadora?</h2>
                    <p className="text-sm sm:text-base">
                        Nossa calculadora de rescisão trabalhista ajuda você a estimar os valores devidos no fim do contrato. O cálculo inclui: saldo de salário, aviso prévio, férias vencidas e proporcionais, 13º salário, FGTS acumulado e multa de 40%. O resultado é educativo e serve como referência — consulte sempre um profissional para os valores oficiais.
                    </p>
                </section>

                {/* Main grid */}
                <main className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">

                    {/* MoneyRain
                    <div className="w-full">
                        <MoneyRain />
                    </div> */}

                    {/* Formulário */}
                    <section className="bg-white/90 text-gray-900 p-4 sm:p-6 rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.4)] w-full">
                        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-purple-700">
                            Insira seus dados
                        </h2>

                        {/* Salário */}
                        <div className="flex flex-col mb-4">
                            <label className="text-sm mb-2">Salário bruto (R$)</label>
                            <input
                                value={salary}
                                onChange={(e) => setSalary(e.target.value)}
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                placeholder="Ex: 2500"
                                className="w-full p-3 rounded-lg border"
                            />
                        </div>

                        {/* Datas */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                            <div className="flex flex-col">
                                <label className="text-sm mb-2">Data de contratação</label>
                                <input
                                    value={hireDate}
                                    onChange={(e) => setHireDate(e.target.value)}
                                    type="date"
                                    className="w-full p-2 rounded-lg border"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm mb-2">Data de saída</label>
                                <input
                                    value={termDate}
                                    onChange={(e) => setTermDate(e.target.value)}
                                    type="date"
                                    className="w-full p-2 rounded-lg border"
                                />
                            </div>
                        </div>

                        {/* Motivo */}
                        <div className="flex flex-col mb-4">
                            <label className="text-sm mb-2">Motivo</label>
                            <select
                                value={motive}
                                onChange={(e) => setMotive(e.target.value)}
                                className="w-full p-3 rounded-lg border"
                            >
                                <option value="sem_justa_causa">Dispensa sem justa causa</option>
                                <option value="pedido_empregado">Pedido de demissão</option>
                                <option value="justa_causa">Justa causa</option>
                                <option value="acordo">Acordo entre as partes</option>
                            </select>
                        </div>

                        {/* Aviso */}
                        <div className="flex flex-col mb-4">
                            <label className="text-sm mb-2">Aviso prévio</label>
                            <select
                                value={aviso}
                                onChange={(e) => setAviso(e.target.value)}
                                className="w-full p-3 rounded-lg border"
                            >
                                <option value="trabalhado">Trabalhado</option>
                                <option value="indenizado">Indenizado</option>
                            </select>
                        </div>

                        {/* Dependentes e FGTS */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                            <div className="flex flex-col">
                                <label className="text-sm mb-2">Dependentes</label>
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    value={dependents}
                                    onChange={(e) => setDependents(e.target.value)}
                                    placeholder="Ex: 2"
                                    className="w-full p-2 rounded-lg border"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm mb-2">Saldo FGTS antes</label>
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    value={fgtsBefore}
                                    onChange={(e) => setFgtsBefore(e.target.value)}
                                    placeholder="Ex: 1000"
                                    className="w-full p-2 rounded-lg border"
                                />
                            </div>
                        </div>

                        {/* Férias */}
                        <div className="flex flex-col mb-4">
                            <label className="text-sm mb-2">Férias vencidas (dias)</label>
                            <input
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                value={vacationDays}
                                onChange={(e) => setVacationDays(e.target.value)}
                                placeholder="Ex: 30"
                                className="w-full p-2 rounded-lg border"
                            />
                        </div>

                        {/* Botões */}
                        <div className="flex flex-col sm:flex-row gap-3 mt-6">
                            <button
                                onClick={() => {
                                    setShowResult(true);
                                    window.scrollTo({ top: 0, behavior: "smooth" });
                                }}
                                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-yellow-400 text-white font-extrabold shadow-[0_0_15px_rgba(255,255,255,0.7)] hover:scale-105 active:scale-95 transition transform animate-pulse"
                            >
                                Rodar Rescisão 🎰
                            </button>
                            <button
                                onClick={() => {
                                    setSalary("");
                                    setHireDate("");
                                    setTermDate("");
                                    setMotive("sem_justa_causa");
                                    setAviso("trabalhado");
                                    setDependents("");
                                    setFgtsBefore("");
                                    setVacationDays("");
                                    setShowResult(false);
                                }}
                                className="py-3 px-5 rounded-xl border bg-white hover:bg-gray-100"
                            >
                                Limpar
                            </button>
                        </div>
                    </section>

                    {/* Resultados */}
                    <section className="relative bg-white/90 p-4 sm:p-6 rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.4)] overflow-hidden text-gray-900 w-full">
                        <canvas
                            ref={confettiRef}
                            className="absolute inset-x-0 top-0 pointer-events-none"
                        />

                        <AnimatePresence>
                            {!showResult && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <h2 className="text-xl sm:text-2xl font-bold mb-3 text-purple-700">
                                        Descubra sua rescisão 🎉
                                    </h2>
                                    <p className="text-gray-700 text-sm sm:text-base">
                                        Preencha os dados e clique em <span className="font-bold">Rodar Rescisão 🎰</span> para revelar seus ganhos.
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
                                            Seus ganhos 💰
                                        </h2>
                                        <div className="text-right text-sm sm:text-base">
                                            <p>Meses de contrato: <strong>{result.totalMonths}</strong></p>
                                            <p>Aviso (dias): <strong>{result.avisoDias}</strong></p>
                                        </div>
                                    </div>

                                    <div className="mt-4 grid grid-cols-1 gap-3">
                                        <Tile label="Saldo Salário" value={result.saldoSalario} emoji="💼" />
                                        <Tile label="13º proporcional" value={result.decimoTerceiro} emoji="🎁" />
                                        <Tile label="Férias (proporcionais + 1/3)" value={result.feriasProporcionais} emoji="🏖️" />
                                        <Tile label="Férias vencidas" value={result.feriasVencidasValor} emoji="📅" />
                                        <Tile label="FGTS estimado" value={result.fgtsAcumulado} emoji="🏦" />
                                        <Tile label="Multa do FGTS (40%)" value={result.multaFgts} emoji="⚖️" />
                                        <Tile label="Aviso prévio indenizado" value={result.avisoValor} emoji="⏳" />

                                        <motion.div className="p-4 rounded-xl bg-gradient-to-r from-green-200 to-green-400 flex flex-col sm:flex-row items-center justify-between mt-2 shadow-lg gap-3">
                                            <div>
                                                <p className="text-sm text-gray-700">Total estimado</p>
                                                <p className="text-3xl sm:text-4xl font-extrabold text-green-700 drop-shadow-[0_0_6px_#00ff00]">
                                                    R$ {result.total.toLocaleString("pt-BR")}
                                                </p>
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => {
                                                        setExplode(true);
                                                        setTimeout(() => setExplode(false), 1200);
                                                    }}
                                                    className="px-4 py-2 rounded-lg bg-yellow-400 font-bold shadow-md hover:scale-105"
                                                >
                                                    🎊 Confete
                                                </button>
                                                <button
                                                    onClick={() => window.print()}
                                                    className="px-4 py-2 rounded-lg border bg-white"
                                                >
                                                    Imprimir
                                                </button>
                                            </div>
                                        </motion.div>

                                        <GameBoard
                                            key={JSON.stringify(result)}
                                            result={result}
                                            onWin={() => setExplode(true)}
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </section>
                </main>

            </div>
            <section className="max-w-4xl mx-auto px-4 py-12 text-gray-800">
                <h2 className="text-2xl font-bold mb-6">
                    Como funciona a rescisão de contrato de trabalho?
                </h2>
                <p className="mb-4">
                    A rescisão de contrato de trabalho é, basicamente, o momento em que se
                    encerra oficialmente a relação entre empresa e colaborador. Esse fim pode
                    acontecer por iniciativa do funcionário ou da própria empresa, e cada
                    situação tem suas próprias regras.
                </p>
                <p className="mb-4">
                    No setor privado, existem diferentes modalidades de contrato, e cada uma
                    possui detalhes específicos definidos pela CLT. Mesmo assim, alguns pontos
                    sempre entram no cálculo: saldo de salário, férias proporcionais ou
                    vencidas, FGTS, aviso prévio e, em alguns casos, o seguro-desemprego.
                </p>
                <p className="mb-8">
                    Tudo isso é formalizado por meio do{" "}
                    <strong>Termo de Rescisão do Contrato de Trabalho</strong>, que precisa ser
                    assinado pelas partes.
                </p>

                <h3 className="text-xl font-semibold mb-4">
                    Cálculo de rescisão com FGTS e multa
                </h3>
                <p className="mb-4">
                    O cálculo muda bastante de acordo com o tipo de desligamento: pode ser sem
                    justa causa, por pedido de demissão, por justa causa, em comum acordo ou até
                    por culpa recíproca.
                </p>
                <p className="mb-4">
                    No caso mais comum — a demissão sem justa causa, feita pela empresa — entram
                    na conta:
                </p>
                <ul className="list-disc list-inside mb-6 space-y-1">
                    <li>Saldo de salário</li>
                    <li>13º salário proporcional</li>
                    <li>Férias vencidas + férias proporcionais + 1/3</li>
                    <li>FGTS acumulado</li>
                    <li>Multa de 40% sobre o FGTS</li>
                    <li>Seguro-desemprego (se houver direito)</li>
                    <li>Salário-família (quando aplicável)</li>
                </ul>
                <p className="mb-8">
                    A base para todos esses cálculos é sempre o <strong>salário bruto</strong>,
                    sem descontos de INSS ou IR. Quer confirmar o saldo do seu FGTS? Você pode
                    consultar direto pelo aplicativo oficial da Caixa.
                </p>

                <h3 className="text-xl font-semibold mb-4">E o aviso prévio?</h3>
                <p className="mb-4">
                    Se a empresa não exigir o cumprimento do aviso prévio, o valor referente a
                    esse período é adicionado à rescisão. A regra é simples:
                </p>
                <ul className="list-disc list-inside mb-6 space-y-1">
                    <li>Até 1 ano de casa: 30 dias de aviso</li>
                    <li>
                        A cada ano completo, somam-se 3 dias extras, podendo chegar até 90 dias no
                        máximo
                    </li>
                </ul>
                <p className="mb-4">Exemplo prático:</p>
                <ul className="list-disc list-inside mb-6 space-y-1">
                    <li>Quem trabalhou 8 meses recebe 30 dias</li>
                    <li>Quem trabalhou 3 anos e 4 meses recebe 39 dias de aviso</li>
                </ul>
                <p className="mb-8">
                    Já quando o próprio funcionário pede demissão, o aviso prévio é sempre de 30
                    dias.
                </p>

                <h3 className="text-xl font-semibold mb-4">Quem tem direito à rescisão?</h3>
                <p className="mb-4">Os principais cenários são:</p>
                <ul className="list-disc list-inside mb-6 space-y-1">
                    <li>
                        <strong>Sem justa causa:</strong> empregado recebe praticamente todos os
                        direitos
                    </li>
                    <li>
                        <strong>Com justa causa:</strong> alguns direitos são cortados, como multa
                        do FGTS, aviso prévio e férias proporcionais
                    </li>
                    <li>
                        <strong>Pedido de demissão:</strong> o funcionário abre mão de parte dos
                        direitos, mas recebe saldo de salário e férias
                    </li>
                    <li>
                        <strong>Culpa recíproca:</strong> quando tanto a empresa quanto o
                        colaborador descumprem obrigações
                    </li>
                </ul>
                <p className="mb-8">
                    Saber em qual dessas situações você se encaixa é fundamental para entender o
                    que esperar do cálculo.
                </p>

                <h3 className="text-xl font-semibold mb-4">Prazo para pagamento</h3>
                <p className="mb-8">
                    A lei é clara: a empresa tem até{" "}
                    <strong>10 dias corridos após o fim do contrato</strong> para pagar a
                    rescisão. Se não cumprir esse prazo, precisa pagar multa equivalente a{" "}
                    <strong>um salário inteiro</strong> ao colaborador.
                </p>

                <h3 className="text-xl font-semibold mb-4">Dúvidas comuns sobre rescisão</h3>
                <ul className="list-disc list-inside space-y-1">
                    <li>O que é o Termo de Rescisão do Contrato de Trabalho?</li>
                    <li>Se eu pedir demissão, quais direitos mantenho?</li>
                    <li>Como funciona exatamente o aviso prévio?</li>
                    <li>Posso ser demitido durante o período de experiência?</li>
                    <li>O que caracteriza justa causa?</li>
                    <li>O que é rescisão indireta?</li>
                </ul>
                <p className="mt-6">
                    Essas são algumas das dúvidas mais frequentes, e conhecer as respostas faz
                    toda a diferença para evitar prejuízos.
                </p>
            </section>

        </div>
    );
}
