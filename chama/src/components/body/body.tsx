'use client'

import { Search } from "lucide-react";
import { useState } from "react";

const companies = [
    { name: "Azul", color: "bg-blue-500", logo: "🌎" },
    { name: "GOL", color: "bg-orange-500", logo: "🟠" },
    { name: "Avianca", color: "bg-red-500", logo: "✈️" },
    { name: "Viação Cometa", color: "bg-blue-700", logo: "🚍" },
];
export default function Body() {
    const [selected, setSelected] = useState("GOL");
    return (
        <div >
            <main className="flex flex-1">
                {/* Sidebar */}
                <div className="w-1/3 bg-green-900 text-white p-4">
                    <div className="relative mb-4">
                        <input
                            type="text"
                            placeholder="Buscar"
                            className="w-full pl-10 pr-3 py-2 rounded bg-green-800 placeholder-gray-300 text-white"
                        />
                        <Search className="absolute left-2 top-2.5 w-5 h-5 text-gray-300" />
                    </div>
                    <ul className="space-y-2">
                        {companies.map((company) => (
                            <li
                                key={company.name}
                                onClick={() => setSelected(company.name)}
                                className={`flex items-center gap-3 px-3 py-2 rounded cursor-pointer hover:bg-green-700 ${selected === company.name ? "bg-green-700" : ""
                                    }`}
                            >
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${company.color}`}
                                >
                                    {company.logo}
                                </div>
                                <span>{company.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Chat */}
                <div className="flex-1 bg-[#ece5dd] p-6 flex flex-col justify-between">
                    <div>
                        <div className="bg-white rounded-lg p-4 shadow mb-4">
                            <p className="font-semibold text-green-800">{selected}</p>
                            <p className="text-sm text-gray-800 mt-1">
                                Olá! Abaixo estão as opções para comprar sua passagem:
                            </p>
                            <div className="mt-4 flex flex-col gap-2">
                                <button className="flex items-center gap-2 bg-green-100 text-green-900 px-4 py-2 rounded">
                                    <span>→</span> Comprar pelo site
                                </button>
                                <button className="flex items-center gap-2 bg-green-100 text-green-900 px-4 py-2 rounded">
                                    <span>📞</span> Atendimento por telefone
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

        </div>
    );
}
