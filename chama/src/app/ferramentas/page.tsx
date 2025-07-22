import Link from "next/link";
import { Wrench, ArrowRight, Hammer } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Ferramentas | ChamanoZap",
    description: "Descubra ferramentas úteis para automatizar e facilitar seu dia a dia.",
};

const tools = [
    {
        id: 1,
        name: "Criar Post Twitter Card",
        description: "Gere um card estilizado para Twitter com imagem, avatar e excerto.",
        url: "/ferramentas/criar-post-twitter-card",
    },
    {
        id: 2,
        name: "Gerar Link do WhatsApp",
        description: "Crie links personalizados para iniciar conversas no WhatsApp com facilidade.",
        url: "https://chamanozap.net/gerar-link-do-whatsapp-converse-facilmente",
        external: true,
    },
    // Adicione mais ferramentas aqui conforme necessário
];

export default function ToolsPage() {
    return (
        <main className="min-h-screen bg-[#f5f3ef] py-4 sm:py-6 px-2 sm:px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Wrench className="w-8 h-8 text-green-600" />
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                            Ferramentas Úteis
                        </h1>
                    </div>
                    <p className="text-gray-600 text-lg">
                        Automatize suas tarefas e melhore sua produtividade com ferramentas práticas.
                    </p>
                </div>

                {/* Lista de Ferramentas */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {tools.map((tool) => {
                        const ToolLink = tool.external ? "a" : Link;
                        return (
                            <ToolLink
                                key={tool.id}
                                href={tool.url}
                                target={tool.external ? "_blank" : undefined}
                                rel={tool.external ? "noopener noreferrer" : undefined}
                                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 group block"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                                            <Hammer className="w-6 h-6 text-green-600" />
                                        </div>
                                        <div>
                                            <h2 className="text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                                                {tool.name}
                                            </h2>
                                            <p className="text-sm text-gray-500">Acessar</p>
                                        </div>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
                                </div>
                                {tool.description && (
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {tool.description}
                                    </p>
                                )}
                            </ToolLink>
                        );
                    })}
                </div>

                {/* Estatísticas */}
                <div className="bg-white rounded-xl shadow-md p-6 mt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Estatísticas das Ferramentas
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div>
                            <div className="text-2xl font-bold text-green-600">
                                {tools.length}
                            </div>
                            <div className="text-sm text-gray-600">Ferramentas</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-blue-600">-</div>
                            <div className="text-sm text-gray-600">Mais Acessada</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-purple-600">-</div>
                            <div className="text-sm text-gray-600">Atualizadas</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-orange-600">-</div>
                            <div className="text-sm text-gray-600">Novas</div>
                        </div>
                    </div>
                </div>

                {/* Botões de Navegação */}
                <div className="bg-white rounded-xl shadow-md p-6 mt-6 text-center">
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                        >
                            Voltar ao Início
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
