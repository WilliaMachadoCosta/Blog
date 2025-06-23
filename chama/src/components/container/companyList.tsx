import Link from "next/link";

const companies = [
    { name: "Azul", slug: "azul" },
    { name: "GOL", slug: "gol" },
    { name: "Avianca", slug: "avianca" },
    { name: "Viação Cometa", slug: "viacao-cometa" },
];

export default function CompanyList() {
    return (
        <div className="grid grid-cols-1 gap-4">
            {companies.map((company) => (
                <Link
                    key={company.slug}
                    href={`/company/${company.slug}`}
                    className="p-4 rounded-lg bg-white shadow hover:shadow-md transition"
                >
                    {company.name}
                </Link>
            ))}
        </div>
    );
}
