"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const bills = ["💵", "💸"];

export default function MoneyRain() {
    const [items, setItems] = useState<{ id: number; emoji: string }[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setItems((prev) => [
                ...prev,
                { id: Date.now(), emoji: bills[Math.floor(Math.random() * bills.length)] },
            ]);
        }, 500); // solta uma nota a cada meio segundo

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
            {items.map((item) => (
                <motion.div
                    key={item.id}
                    initial={{ y: -50, x: Math.random() * window.innerWidth, opacity: 1, rotate: 0 }}
                    animate={{ y: window.innerHeight + 100, rotate: 360, opacity: 1 }}
                    transition={{ duration: 4, ease: "linear" }}
                    onAnimationComplete={() =>
                        setItems((prev) => prev.filter((p) => p.id !== item.id))
                    }
                    className="absolute text-3xl"
                >
                    {item.emoji}
                </motion.div>
            ))}
        </div>
    );
}
