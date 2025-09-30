"use client";
import { motion } from "framer-motion";

export function BonusEffect({ bonus }: { bonus: number }) {
    if (bonus <= 0) return null;

    return (
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1.2 }}
            transition={{ type: "spring" }}
            className="text-yellow-500 text-3xl animate-bounce"
        >
            🪙 +{bonus}
        </motion.div>
    );
}
