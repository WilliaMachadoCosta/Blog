'use client'

import { useState } from "react";
import CompanyLogo from "../company/companyLogo";
import { ChevronLeft, ChevronRight, Undo2, Phone, Globe, MessageSquare } from "lucide-react"; // Adicionado MessageSquare para WhatsApp

const companies = [
    { name: "Azul", descricao: "Fale com a Azul", logo: "/logos/azul.jpeg", comentarios: ["Excelente atendimento!", "Muito boa!"], title: "WhatsApp Azul, Telefone, SAC" },
    { name: "GOL", descricao: "Fale com a Gol", logo: "/logos/gol.jpg", comentarios: ["Preço acessível."], title: "WhatsApp Gol, Telefone, SAC" },
    { name: "Avianca", descricao: "Fale com a Avianca", logo: "/logos/avianca.png", comentarios: [], title: "WhatsApp Avianca, Telefone, SAC" },
    { name: "Viação Cometa", descricao: "Fale com a Cometa", logo: "/logos/cometa.png", comentarios: ["Viagem confortável."], title: "WhatsApp Cometa, Telefone, SAC" },
    { name: "Latam", descricao: "Fale com a Latam", logo: "/logos/latam.png", comentarios: ["Ótima experiência!"], title: "WhatsApp Latam, Telefone, SAC" },
    { name: "São Paulo Transportes", descricao: "Fale com a SPT", logo: "/logos/spt.png", comentarios: ["Serviço eficiente"] },
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
    { id: 1, title: "Azul linhas ", content: "Conteúdo do post 1", image: "/logos/azul.jpeg" },
    { id: 2, title: "Post 2", content: "Conteúdo do post 2", image: "/logos/gol.jpg" },
    { id: 3, title: "Post 3", content: "Conteúdo do post 3", image: "/logos/latam.png" },
    // { id: 4, title: "Post 4", content: "Conteúdo do post 4", image: "/posts/post4.jpg" },
    // { id: 5, title: "Post 5", content: "Conteúdo do post 5", image: "/posts/post5.jpg" },
];

// Dados do post do blog mocado
const blogPostContent = {
    title: "WhatsApp da Azul: Guia Completo de Atendimento",
    sections: [
        {
            heading: null,
            content: `A Azul linhas aéreas agora passa a atender também por WhatsApp, esta incrível novidade altera em muito a experiência de atendimento da companhia.
            Se você está precisando falar com a Azul, este post foi feito para você! Aqui apresentaremos um guia com as melhores dicas sobre atendimento para você resolver de vez seu problema.`
        },
        {
            heading: "Atendimento da Azul Viagens",
            content: `A imagem abaixo representa os resultados das companhias aéreas em março de 2022. Veja que a Azul representa a menor porção de participação, este número tende a ser sempre inferior ao de seus concorrentes.
            Porém, a Azul é destaque quando o assunto é conforto, atendimento e compromisso com o cliente.`
        },
        {
            heading: "WhatsApp da Azul Viagens",
            content: `O WhatsApp da Azul Viagens é o **11 4004 2985**. Clique no botão abaixo para falar com a Céu, a Inteligência Artificial da Azul.
            A Céu ainda está em processo de aprendizagem, assim como qualquer outra IA, embora já consiga esclarecer várias dúvidas ou solicitar informações.`
        },
        {
            heading: "Então para uma experiência ainda melhor siga estas instruções:",
            list: [
                "Envie mensagens simples contendo apenas uma linha.",
                "Aguarde a resposta antes de enviar a segunda mensagem.",
                "Através do WhatsApp da Azul você pode:",
                "Consultar o Status do voo",
                "Realizar ou Remover Check-in",
                "Marcar Assentos e Antecipar o Voo",
                "Esclarecer dúvidas relacionadas a Cancelamento, Alteração, Bagagem, Programa Tudo Azul e Crédito Azul."
            ]
        },
        {
            heading: "Telefone Azul Viagens",
            content: `Contudo, caso você deseje entrar em contato com a Azul por meio de ligação telefônica, vou listar abaixo os números.
            Lembrando que estes números são específicos para:`,
            list: [
                "Compra de passagens",
                "Produtos e Serviços",
                "Alterações",
                "Solicitações",
                "Informações"
            ],
            table: {
                headers: ["Telefone Azul Viagens", "Respostas", "Horário de atendimento"],
                rows: [
                    ["CAPITAIS E REGIÕES METROPOLITANAS", "4003 1118", "06h – 00h"],
                    ["DEMAIS LOCALIDADES (LIGAÇÃO GRATUITA)", "0800 887 1118", "24h"],
                    ["NO EXTERIOR", "4003 3255", "24h"],
                    ["ESTADOS UNIDOS E CANADÁ", "+1 888 587 2985", "24h"],
                    ["PORTUGAL (LIGAÇÃO GRATUITA)", "+351 800 602985", "24h"],
                    ["Chat- Fale Com a Gente", "Disponivel no site, no canto inferior direito", "-"]
                ]
            }
        },
        {
            heading: "Telefone Azul Viagens |Pacotes de Viagens|",
            content: `Além dos números acima, por uma questão interna de gerenciamento de chamadas a empresa separou números específicos para quem precisa de informações sobre vendas de pacotes de viagens.
            Para falar com a Azul sobre os pacotes de viagens ligue para os números.`,
            list: [
                "**4003 1181** CAPITAIS E REGIÕES METROPOLITANAS",
                "**0800 880 2985** DEMAIS LOCALIDADES"
            ]
        }
    ]
};

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
    const postsPerView = 2;
    const totalPostPages = Math.ceil(posts.length / postsPerView);

    function nextPage() {
        setPage((old) => (old + 1) % totalPages);
    }
    function prevPage() {
        setPage((old) => (old - 1 + totalPages) % totalPages);
    }

    // function nextPost() {
    //     setPostIndex((old) => (old + 1) % totalPostPages);
    // }
    // function prevPost() {
    //     setPostIndex((old) => (old - 1 + totalPostPages) % totalPostPages);
    // }

    // Dados de contato para o post da Azul (mocados para o exemplo)
    const contactInfo = {
        whatsapp: "1140042985", // Sem espaços para o link do WhatsApp
        phone: "40031118", // Principal para cidades e regiões metropolitanas
        site: "https://www.voeazul.com.br" // URL de exemplo
    };

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
                                    <p className="font-normal text-neutral-800">{company.title}</p>
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
                            className="flex items-center gap-1 px-4 py-2 rounded-full border border-green-900 text-green-900 hover:bg-green-900 hover:text-white transition"
                        >
                            <ChevronLeft size={20} />
                        </button>

                        <span className="flex items-center text-gray-700">
                            Página {page + 1} de {totalPages}
                        </span>
                        <button
                            onClick={nextPage}
                            className="flex items-center gap-1 px-4 py-2 rounded-full border border-green-900 text-green-900 hover:bg-green-900 hover:text-white transition"
                            disabled={totalPages <= 1}
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>

                    {/* Carrossel de posts */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4 text-green-900">Posts em Destaque</h3>

                        <div className="relative">
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

                            {/* Bolinhas indicadores abaixo dos posts */}
                            <div className="flex justify-center gap-2 mt-4">
                                {Array.from({ length: totalPostPages }).map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setPostIndex(i)}
                                        className={`w-3 h-3 rounded-full transition-all duration-300 ${i === postIndex ? 'bg-green-900 scale-110' : 'bg-green-300'
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                </>
            )}

            {/* POST-BLOG */}
            {selectedCompany && (
                <div className="bg-white rounded-lg p-4 shadow">
                    {/* Botão Voltar aprimorado */}
                    <button
                        onClick={() => setSelected(null)}
                        className="flex items-center gap-2 text-green-700 font-medium mb-4 p-2 rounded-full hover:bg-green-50 transition-colors"
                        aria-label="Voltar para a lista de empresas"
                    >
                        <Undo2 size={20} />
                        Voltar
                    </button>

                    <div className="flex items-center gap-4 mb-6">
                        <img src={selectedCompany.logo} alt={selectedCompany.name} className="w-16 h-16 object-contain rounded-full border-2 border-green-200 p-1" />
                        <h1 className="text-2xl font-bold text-green-800">{selectedCompany.name}</h1>
                    </div>

                    {/* Botões de contato direto */}
                    <div className="flex flex-wrap gap-3 mb-6">
                        <a
                            href={`https://wa.me/${contactInfo.whatsapp}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-green-500 text-white px-5 py-2 rounded-full shadow-md hover:bg-green-600 transition-colors text-sm font-semibold"
                            aria-label="Contatar via WhatsApp"
                        >
                            <MessageSquare size={18} /> WhatsApp
                        </a>
                        <a
                            href={`tel:${contactInfo.phone}`}
                            className="flex items-center gap-2 bg-blue-500 text-white px-5 py-2 rounded-full shadow-md hover:bg-blue-600 transition-colors text-sm font-semibold"
                            aria-label="Ligar para o telefone"
                        >
                            <Phone size={18} /> Telefone
                        </a>
                        <a
                            href={contactInfo.site}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-purple-500 text-white px-5 py-2 rounded-full shadow-md hover:bg-purple-600 transition-colors text-sm font-semibold"
                            aria-label="Visitar o site"
                        >
                            <Globe size={18} /> Site
                        </a>
                    </div>

                    {/* Seção do Artigo do Blog */}
                    <article className="prose prose-lg max-w-none text-gray-800">
                        <h2 className="text-xl font-semibold text-green-900 mb-4">{blogPostContent.title}</h2>
                        {blogPostContent.sections.map((section, index) => (
                            <div key={index} className="mb-6">
                                {section.heading && <h3 className="text-lg font-semibold text-green-800 mb-2">{section.heading}</h3>}
                                {section.content && <p className="leading-relaxed mb-2" dangerouslySetInnerHTML={{ __html: section.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}></p>}
                                {section.list && (
                                    <ul className="list-disc list-inside space-y-1 mb-2">
                                        {section.list.map((item, i) => (
                                            <li key={i} dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}></li>
                                        ))}
                                    </ul>
                                )}
                                {section.table && (
                                    <div className="overflow-x-auto my-4">
                                        <table className="min-w-full bg-white border border-gray-200">
                                            <thead>
                                                <tr>
                                                    {section.table.headers.map((header, i) => (
                                                        <th key={i} className="py-2 px-4 border-b text-left bg-gray-100 font-medium text-gray-700">{header}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {section.table.rows.map((row, i) => (
                                                    <tr key={i} className="hover:bg-gray-50">
                                                        {row.map((cell, j) => (
                                                            <td key={j} className="py-2 px-4 border-b text-gray-800">{cell}</td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        ))}
                    </article>

                    {/* Seção para Google Ads */}
                    <div className="mt-8 p-4 bg-gray-100 border border-dashed border-gray-300 text-center text-gray-600 rounded-lg">
                        <p className="font-semibold mb-2">Espaço para Google Ads</p>
                        <p className="text-sm">Insira o código do seu anúncio do Google AdSense aqui.</p>

                        {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID"
                            crossOrigin="anonymous"></script>
                        <ins className="adsbygoogle"
                            style={{ display: 'block' }}
                            data-ad-client="ca-pub-YOUR_PUBLISHER_ID"
                            data-ad-slot="YOUR_AD_SLOT_ID"
                            data-ad-format="auto"
                            data-full-width-responsive="true"></ins>
                        <script>
                            (adsbygoogle = window.adsbygoogle || []).push({});
                        </script> */}
                    </div>
                </div>
            )}
        </div>
    );
}