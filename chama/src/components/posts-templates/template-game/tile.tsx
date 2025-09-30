"use client";
import { motion } from "framer-motion";

type TileProps = {
    label: string;
    value: number;
    emoji: string;
};

export function Tile({ label, value, emoji }: TileProps) {
    return (
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="p-4 rounded-xl bg-gradient-to-tr from-yellow-200 via-pink-200 to-purple-300 shadow-[0_0_10px_rgba(255,255,255,0.6)] flex items-center justify-between"
        >
            <div className="flex items-center gap-3">
                <div className="text-3xl animate-bounce">{emoji}</div>
                <div>
                    <div className="text-sm text-purple-800 font-bold">{label}</div>
                    <div className="text-2xl font-extrabold text-green-600 drop-shadow-[0_0_6px_#00ff00]">
                        R$ {Number(value).toLocaleString("pt-BR")}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
