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
        <div className="mt-6 border-t pt-4">
            <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-200 mb-2">
                Compartilhar:
            </h4>
            <div className="flex flex-wrap gap-4">
                <a
                    href={`https://wa.me/?text=${encodeURIComponent(url)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-green-600 hover:underline"
                >
                    <Send size={16} />
                    WhatsApp
                </a>

                <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-600 hover:underline"
                >
                    <Facebook size={16} />
                    Facebook
                </a>

                <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sky-500 hover:underline"
                >
                    <Twitter size={16} />
                    Twitter
                </a>
            </div>
        </div>
    );
}
