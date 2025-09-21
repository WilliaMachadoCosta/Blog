import { FaWhatsapp, FaPhone } from "react-icons/fa";

interface GenericButtonProps {
    href: string;
    label: string;
    variant?: "whatsapp" | "sac";
}

export function GenericButton({ href, label, variant }: GenericButtonProps) {

    const extractNumber = (url: string) => {
        if (url.startsWith("https://api.whatsapp.com/send?phone=")) {
            return url.split("phone=")[1];
        } else if (url.startsWith("tel:")) {
            return url.replace("tel:", "");
        }
        return undefined;
    };

    const number = extractNumber(href);

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full max-w-sm mx-auto bg-gray-100 rounded-lg shadow-md p-4 hover:shadow-lg transition-all"
        >
            <div className="flex items-center gap-3">
                {variant === "whatsapp" && (
                    <FaWhatsapp className="text-green-500 bg-white rounded-full p-1 text-3xl" />
                )}
                {variant === "sac" && (
                    <FaPhone className="text-blue-500 bg-white rounded-full p-1 text-3xl" />
                )}
                <div className="flex flex-col flex-1">
                    <span className="text-blue-800 text-sm uppercase font-bold">{label}</span>
                    {number && (
                        <span className="font-bold text-lg text-blue-700">{number}</span>
                    )}
                </div>
            </div>
        </a>
    );
}
