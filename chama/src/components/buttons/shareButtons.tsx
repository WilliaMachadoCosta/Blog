"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Facebook, Twitter, Send } from "lucide-react";

export default function ShareButtons() {
    const pathname = usePathname();
    const [url, setUrl] = useState("");

    useEffect(() => {
        if (typeof window !== "undefined") {
            setUrl(`${window.location.origin}${pathname}`);
        }
    }, [pathname]);

    if (!url) return null;

    return (
        <div className="mt-4 sm:mt-6 border-t pt-3 sm:pt-4">
            <p className="text-xs sm:text-sm font-semibold text-neutral-700 dark:text-neutral-200 mb-2">
                Compartilhar:
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-4">
                <a
                    href={`https://wa.me/?text=${encodeURIComponent(url)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-green-600 hover:underline text-xs sm:text-sm p-2 rounded hover:bg-green-50 transition-colors"
                >
                    <Send size={14} className="sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">WhatsApp</span>
                    <span className="sm:hidden">WhatsApp</span>
                </a>

                <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-600 hover:underline text-xs sm:text-sm p-2 rounded hover:bg-blue-50 transition-colors"
                >
                    <Facebook size={14} className="sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Facebook</span>
                    <span className="sm:hidden">Facebook</span>
                </a>

                <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sky-500 hover:underline text-xs sm:text-sm p-2 rounded hover:bg-sky-50 transition-colors"
                >
                    <Twitter size={14} className="sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Twitter</span>
                    <span className="sm:hidden">X</span>
                </a>
            </div>
        </div>
    );
}
