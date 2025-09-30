"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { BonusEffect } from "./bonus";


type GameBoardProps = {
    result: any;
    onWin: () => void;
};

export function GameBoard({ result, onWin }: GameBoardProps) {
    const tiles = [
        { label: "Saldo", value: result.saldoSalario, emoji: "💼" },
        { label: "13º", value: result.decimoTerceiro, emoji: "🎁" },
        { label: "Férias", value: result.feriasProporcionais, emoji: "🏖️" },
        { label: "FGTS", value: result.fgtsAcumulado, emoji: "🏦" },
        { label: "Multa FGTS", value: result.multaFgts, emoji: "⚖️" },
        { label: "Aviso", value: result.avisoValor, emoji: "⏳" },
    ];

    const [collected, setCollected] = useState<number[]>([]);
    const [bonus, setBonus] = useState<number>(0);

    function toggleCollect(i: number) {
        if (collected.includes(i)) {
            setCollected((c) => c.filter((x) => x !== i));
        } else {
            setCollected((c) => [...c, i]);
            if (Math.random() < 0.3) {
                const b = Math.floor(Math.random() * 300 + 100);
                setBonus((x) => x + b);
                onWin();
            }
        }
    }

    const collectedSum = collected.reduce((acc, i) => acc + tiles[i].value, 0);

    return (
        <div className="mt-6">
            <h3 className="text-lg font-bold text-purple-700 mb-2">
                Jogo da Rescisão 🎲
            </h3>
            <div className="grid grid-cols-3 gap-3">
                {tiles.map((tile, i) => (
                    <motion.button
                        key={i}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleCollect(i)}
                        className={`p-4 rounded-xl text-center font-bold ${collected.includes(i)
                            ? "bg-gradient-to-tr from-green-300 to-green-500 text-green-900 shadow-[0_0_15px_#00ff00]"
                            : "bg-gradient-to-tr from-pink-200 to-purple-300 text-purple-800 shadow-md"
                            }`}
                    >
                        <div className="text-2xl">{tile.emoji}</div>
                        <div>{tile.label}</div>
                    </motion.button>
                ))}
            </div>

            <div className="mt-3 p-3 rounded-lg bg-gradient-to-r from-yellow-100 to-pink-100 flex items-center justify-between">
                <div>
                    <p className="text-sm text-purple-700">Total coletado</p>
                    <p className="text-xl font-extrabold text-green-700">
                        R$ {(collectedSum + bonus).toLocaleString("pt-BR")}
                    </p>
                </div>
                <BonusEffect bonus={bonus} />
            </div>
        </div>
    );
}
