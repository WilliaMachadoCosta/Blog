import Link from "next/link";

export default function CompanyPage({
    params,
}: {
    params: { slug: string };
}) {
    return (
        <div className="p-4">
            <Link
                href="/"
                className="text-sm text-blue-500 hover:underline block mb-4"
            >
                ← Voltar
            </Link>

            <h1 className="text-2xl font-bold mb-4 capitalize">{params.slug}</h1>

            <div className="space-y-3">
                <button className="w-full p-3 rounded bg-green-100 dark:bg-green-900">
                    Comprar pelo site
                </button>
                <button className="w-full p-3 rounded bg-green-100 dark:bg-green-900">
                    Atendimento por telefone
                </button>
            </div>
        </div>
    );
}
