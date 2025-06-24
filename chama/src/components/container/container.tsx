'use client'

import { useState } from "react";
import CompanyLogo from "../company/companyLogo";

const companies = [
    { name: "Azul", descricao: "Fale com a Azul", logo: "/logos/azul.jpeg", comentarios: ["Excelente atendimento!", "Muito boa!"] },
    // { name: "GOL", descricao: "Fale com a Gol", logo: "/logos/gol.png", comentarios: ["Preço acessível."] },
    // { name: "Avianca", descricao: "Fale com a Avianca", logo: "/logos/avianca.png", comentarios: [] },
    // { name: "Viação Cometa", descricao: "Fale com a Cometa", logo: "/logos/cometa.png", comentarios: ["Viagem confortável."] },
    { name: "Latam", descricao: "Fale com a Latam", logo: "/logos/latam.png", comentarios: ["Ótima experiência!"] },
    // { name: "São Paulo Transportes", descricao: "Fale com a SPT", logo: "/logos/spt.png", comentarios: ["Serviço eficiente"] },
    // // pode adicionar mais
    // { name: "Azul", descricao: "Fale com a Azul", logo: "/logos/azul.png", comentarios: ["Excelente atendimento!", "Muito boa!"] },
    // { name: "GOL", descricao: "Fale com a Gol", logo: "/logos/gol.png", comentarios: ["Preço acessível."] },
    // { name: "Avianca", descricao: "Fale com a Avianca", logo: "/logos/avianca.png", comentarios: [] },
    // { name: "Viação Cometa", descricao: "Fale com a Cometa", logo: "/logos/cometa.png", comentarios: ["Viagem confortável."] },
    // { name: "Latam", descricao: "Fale com a Latam", logo: "/logos/latam.png", comentarios: ["Ótima experiência!"] },
    // { name: "São Paulo Transportes", descricao: "Fale com a SPT", logo: "/logos/spt.png", comentarios: ["Serviço eficiente"] },
    // pode adicionar mais
];

const posts = [
    { id: 1, title: "Post 1", content: "Conteúdo do post 1", image: "/posts/post1.jpg" },
    { id: 2, title: "Post 2", content: "Conteúdo do post 2", image: "/posts/post2.jpg" },
    { id: 3, title: "Post 3", content: "Conteúdo do post 3", image: "/posts/post3.jpg" },
    { id: 4, title: "Post 4", content: "Conteúdo do post 4", image: "/posts/post4.jpg" },
    { id: 5, title: "Post 5", content: "Conteúdo do post 5", image: "/posts/post5.jpg" },
];

export default function Container() {
    const [selected, setSelected] = useState<string | null>(null);

    // Paginação de empresas
    const itemsPerPage = 5;
    const [page, setPage] = useState(0);
    const totalPages = Math.ceil(companies.length / itemsPerPage);
    const pagedCompanies = companies.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

    const selectedCompany = companies.find(c => c.name === selected);

    // Estado do carrossel de posts
    const [postIndex, setPostIndex] = useState(0);
    const postsPerView = 4;
    const totalPostPages = Math.ceil(posts.length / postsPerView);

    function nextPage() {
        setPage((old) => (old + 1) % totalPages);
    }
    function prevPage() {
        setPage((old) => (old - 1 + totalPages) % totalPages);
    }

    function nextPost() {
        setPostIndex((old) => (old + 1) % totalPostPages);
    }
    function prevPost() {
        setPostIndex((old) => (old - 1 + totalPostPages) % totalPostPages);
    }

    return (
        <div className="min-h-screen bg-[#f5f3ef] p-4">
            {!selected && (
                <>
                    {/* Lista paginada de empresas */}
                    <ul className="space-y-2 mb-8">
                        {pagedCompanies.map((company) => (
                            <li
                                key={company.name}
                                onClick={() => setSelected(company.name)}
                                className="flex items-center gap-3 bg-[#f5f3ef] p-3 rounded shadow cursor-pointer hover:bg-gray-100"
                            >
                                <CompanyLogo
                                    src={company.logo}
                                    alt={`Logo da ${company.name}`}
                                    fallbackText={company.name}
                                />
                                <div>
                                    <p className="font-semibold text-black">{company.name}</p>
                                    <p className="text-sm text-gray-600">
                                        {company.comentarios.length > 0
                                            ? company.comentarios[company.comentarios.length - 1]
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

                    {/* Paginação */}
                    <div className="flex justify-center gap-3 mb-10">
                        <button
                            onClick={prevPage}
                            className="px-3 py-1 rounded bg-green-900 text-white hover:bg-green-900"
                            disabled={totalPages <= 1}
                        >
                            ← Anterior
                        </button>
                        <span className="flex items-center text-gray-700">
                            Página {page + 1} de {totalPages}
                        </span>
                        <button
                            onClick={nextPage}
                            className="px-3 py-1 rounded bg-green-900 text-white hover:bg-green-900"
                            disabled={totalPages <= 1}
                        >
                            Próximo →
                        </button>
                    </div>

                    {/* Carrossel de posts */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4 text-green-900">Posts em Destaque</h3>

                        <div className="relative">
                            <button
                                onClick={prevPost}
                                className="absolute left-0 top-1/2 -translate-y-1/2 bg-green-900 text-white p-2 rounded-full hover:bg-green-900 z-10"
                            >
                                ←
                            </button>

                            <div className="flex overflow-hidden gap-4 px-10">
                                {posts
                                    .slice(postIndex * postsPerView, (postIndex + 1) * postsPerView)
                                    .map((post) => (
                                        <div key={post.id} className="bg-white rounded shadow p-4 min-w-[220px] flex-shrink-0">
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="w-full h-32 object-cover rounded mb-2"
                                            />
                                            <h4 className="font-semibold text-green-900 mb-1">{post.title}</h4>
                                            <p className="text-gray-700 text-sm">{post.content}</p>
                                        </div>
                                    ))}
                            </div>

                            <button
                                onClick={nextPost}
                                className="absolute right-0 top-1/2 -translate-y-1/2 bg-green-900 text-white p-2 rounded-full hover:bg-green-700 z-10"
                            >
                                →
                            </button>
                        </div>
                    </div>
                </>
            )}

            {selectedCompany && (
                <div className="bg-white rounded-lg p-4 shadow">
                    <button
                        onClick={() => setSelected(null)}
                        className="text-green-700 font-medium mb-3"
                    >
                        ← Voltar
                    </button>
                    <div className="flex items-center gap-4 mb-4">
                        <img src={selectedCompany.logo} alt={selectedCompany.name} className="w-12 h-12 object-contain" />
                        <h2 className="text-xl font-semibold text-green-800">{selectedCompany.name}</h2>
                    </div>
                    <p className="text-gray-800 mb-4">
                        Olá! Abaixo estão as opções para comprar sua passagem:
                    </p>
                    <div className="flex flex-col gap-2">
                        <button className="flex items-center gap-2 bg-green-100 text-green-900 px-4 py-2 rounded">
                            <span>→</span> Comprar pelo site
                        </button>
                        <button className="flex items-center gap-2 bg-green-100 text-green-900 px-4 py-2 rounded">
                            <span>📞</span> Atendimento por telefone
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
