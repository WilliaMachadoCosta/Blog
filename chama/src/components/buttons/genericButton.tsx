interface GenericButtonProps {
    href: string;
    label: string;
    variant?: "whatsapp" | "sac" | "central" | "default";
}

export function GenericButton({ href, label, variant = "default" }: GenericButtonProps) {
    const base = "inline-flex items-center px-3 sm:px-4 py-2 sm:py-3 rounded-md shadow font-medium transition text-white no-underline visited:text-white hover:text-white text-sm sm:text-base";

    const variants = {
        whatsapp: `${base} bg-green-800 hover:bg-green-600`,
        sac: `${base} bg-blue-600 hover:bg-blue-700`,
        central: `${base} bg-neutral-800 hover:bg-neutral-900`,
        default: `${base} bg-gray-600 hover:bg-gray-700`,
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
