'use client'

import { useState } from "react";
import { ChevronLeft, ChevronRight, Undo2, Phone, Globe, MessageSquare } from "lucide-react";
import CompanyLogo from "../company/companyLogo";




const companies = [
    { name: "Azul", descricao: "Fale com a Azul", logo: "/logos/azul.jpeg", comentarios: ["Excelente atendimento!", "Muito boa!"], title: "WhatsApp Azul, Telefone, SAC" },
    { name: "GOL", descricao: "Fale com a Gol", logo: "/logos/gol.jpg", comentarios: ["Preço acessível."], title: "WhatsApp Gol, Telefone, SAC" },
    { name: "Avianca", descricao: "Fale com a Avianca", logo: "/logos/avianca.png", comentarios: [], title: "WhatsApp Avianca, Telefone, SAC" },
    { name: "Viação Cometa", descricao: "Fale com a Cometa", logo: "/logos/cometa.png", comentarios: ["Viagem confortável."], title: "WhatsApp Cometa, Telefone, SAC" },
    { name: "Latam", descricao: "Fale com a Latam", logo: "/logos/latam.png", comentarios: ["Ótima experiência!"], title: "WhatsApp Latam, Telefone, SAC" },
    { name: "São Paulo Transportes", descricao: "Fale com a SPT", logo: "/logos/spt.png", comentarios: ["Serviço eficiente"], title: "WhatsApp SPT, Telefone, SAC" },
];

const contactInfo = {
    whatsapp: "1140042985",
    phone: "40031118",
    site: "https://www.voeazul.com.br"
};

export default function Container() {
    const [selected, setSelected] = useState<string | null>(null);
    const selectedCompany = companies.find(c => c.name === selected);

    const itemsPerPage = 5;
    const [page, setPage] = useState(0);
    const totalPages = Math.ceil(companies.length / itemsPerPage);
    const pagedCompanies = companies.slice(page * itemsPerPage, (page + 1) * itemsPerPage); 2;

    const nextPage = () => setPage((prev) => (prev + 1) % totalPages);
    const prevPage = () => setPage((prev) => (prev - 1 + totalPages) % totalPages);

    return (
        <div className="min-h-screen bg-[#f5f3ef] p-4">
            {!selectedCompany && (
                <>
                    {/* Lista paginada de empresas */}
                    <ul className="space-y-2 mb-8">
                        {pagedCompanies.map((company) => (
                            <li
                                key={company.name}
                                onClick={() => setSelected(company.name)}
                                className="flex items-center gap-3 bg-white p-3 rounded shadow cursor-pointer hover:bg-gray-100"
                            >
                                <CompanyLogo
                                    src={company.logo}
                                    alt={`Logo da ${company.name}`}
                                    fallbackText={company.name}
                                />
                                <div>
                                    <p className="font-semibold text-black">{company.name}</p>
                                    <p className="font-normal text-neutral-800">{company.title}</p>
                                    <p className="text-sm text-gray-600">
                                        {company.comentarios.length > 0
                                            ? company.comentarios.at(-1)
                                            : company.descricao}
                                    </p>
                                </div>
                                {company.comentarios.length > 0 && (
                                    <span className="ml-auto bg-green-900 text-white text-xs px-2 h-5 min-w-[20px] rounded-full flex items-center justify-center">
                                        {company.comentarios.length}
                                    </span>
                                )}
                            </li>
                        ))}
                    </ul>

                    {/* Paginação de empresas */}
                    <div className="flex justify-center gap-3 mb-10">
                        <button
                            onClick={prevPage}
                            className="flex items-center gap-1 px-4 py-2 rounded-full border border-green-900 text-green-900 hover:bg-green-900 hover:text-white transition"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <span className="text-gray-700">Página {page + 1} de {totalPages}</span>
                        <button
                            onClick={nextPage}
                            className="flex items-center gap-1 px-4 py-2 rounded-full border border-green-900 text-green-900 hover:bg-green-900 hover:text-white transition"
                            disabled={totalPages <= 1}
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>


                </>
            )}

            {/* Detalhes da empresa selecionada */}
            {selectedCompany && (
                <div className="bg-white rounded-lg p-4 shadow">
                    <button
                        onClick={() => setSelected(null)}
                        className="flex items-center gap-2 text-green-700 font-medium mb-4 p-2 rounded-full hover:bg-green-50 transition-colors"
                    >
                        <Undo2 size={20} /> Voltar
                    </button>

                    <div className="flex items-center gap-4 mb-6">
                        <img
                            src={selectedCompany.logo}
                            alt={selectedCompany.name}
                            className="w-16 h-16 object-contain rounded-full border-2 border-green-200 p-1"
                        />
                        <h1 className="text-2xl font-bold text-green-800">{selectedCompany.name}</h1>
                    </div>

                    {/* Botões de contato */}
                    <div className="flex flex-wrap gap-3 mb-6">
                        <a
                            href={`https://wa.me/${contactInfo.whatsapp}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-green-500 text-white px-5 py-2 rounded-full shadow-md hover:bg-green-600 transition-colors text-sm font-semibold"
                        >
                            <MessageSquare size={18} /> WhatsApp
                        </a>
                        <a
                            href={`tel:${contactInfo.phone}`}
                            className="flex items-center gap-2 bg-blue-500 text-white px-5 py-2 rounded-full shadow-md hover:bg-blue-600 transition-colors text-sm font-semibold"
                        >
                            <Phone size={18} /> Telefone
                        </a>
                        <a
                            href={contactInfo.site}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-purple-500 text-white px-5 py-2 rounded-full shadow-md hover:bg-purple-600 transition-colors text-sm font-semibold"
                        >
                            <Globe size={18} /> Site
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}
