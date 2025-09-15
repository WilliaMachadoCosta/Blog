interface GenericButtonProps {
    href: string;
    label: string;
    variant?: "whatsapp" | "sac" | "central" | "default" | "insta";
}

export function GenericButton({ href, label, variant = "default" }: GenericButtonProps) {
    const base = "inline-flex items-center px-3 sm:px-4 py-2 sm:py-3 rounded-lg shadow-lg font-semibold transition-all duration-300 text-white no-underline visited:text-white hover:text-white text-sm sm:text-base transform hover:-translate-y-0.5 hover:shadow-xl";

    const variants = {
        whatsapp: `${base} bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600`,
        sac: `${base} bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600`,
        central: `${base} bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700`,
        default: `${base} bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600`,
        insta: `${base} bg-gradient-to-r from-[#d62976] to-[#fa7e1e] hover:from-[#c2185b] hover:to-[#f57c00]`,
    };

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={variants[variant]}
            style={{ color: "white" }} // força cor branca, mesmo se herdar estilo
        >
            {label}
        </a>
    );
}
