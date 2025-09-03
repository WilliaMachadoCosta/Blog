"use client";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function ScrollIndicator() {
    return (
        <div className="w-full flex flex-col items-center mt-6">

            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="cursor-pointer"
                onClick={() =>
                    window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
                }
            >
                <ChevronDown
                    size={36}
                    strokeWidth={3}
                    className="text-orange-600"
                />
            </motion.div>
        </div>
    );
}

