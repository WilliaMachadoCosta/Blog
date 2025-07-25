// app/mensagens/page.tsx

import Link from "next/link";
import { Metadata } from "next";
import { MessageCircle, ArrowRight, Smile, Sun, Moon } from "lucide-react";

export const metadata: Metadata = {
    title: "Mensagens para WhatsApp | ChamanoZap",
    description: "Inspire-se com mensagens prontas para compartilhar no WhatsApp.",
};

// Lista de mensagens com ícones diferentes
const messages = [
    {
        id: 1,
        name: "Mensagem de Bom Dia",
        description: "Comece o dia com uma mensagem positiva e inspiradora.",
        url: "https://chamanozap.net/mensagem-de-bom-dia-para-whatsapp",
        external: true,
        icon: Sun,
    },
    {
        id: 2,
        name: "Mensagem de Boa Noite",
        description: "Deseje bons sonhos com estilo e carinho.",
        url: "https://chamanozap.net/mensagem-de-boa-noite-para-whatsapp",
        external: true,
        icon: Moon,
    },
    {
        id: 3,
        name: "Mensagem de Aniversário para Amigo",
        description: "Celebre a amizade com palavras cheias de afeto.",
        url: "https://chamanozap.net/mensagem-de-aniversario-para-amigo-90-ideias-para-copiar-e-colar",
        external: true,
        icon: Smile,
    },
    {
        id: 4,
        name: "Mensagem de Quinta-feira Motivacional",
        description: "Inspire sua quinta-feira com frases poderosas.",
        url: "https://chamanozap.net/mensagem-bom-dia-quinta-feira-motivacional",
        external: true,
        icon: Sun,
    },
    {
        id: 5,
        name: "Quinta-feira Abençoada",
        description: "Envie bênçãos nesta linda quinta-feira.",
        url: "https://chamanozap.net/as-melhores-mensagens-de-bom-dia-quinta-feira-abencoada-por-deus",
        external: true,
        icon: Sun,
    },
    {
        id: 6,
        name: "Sextou! Frases para WhatsApp",
        description: "Dê boas-vindas ao fim de semana com alegria.",
        url: "https://chamanozap.net/sextou-frases-para-whatsapp",
        external: true,
        icon: Smile,
    },
    {
        id: 7,
        name: "Frases para Recado do WhatsApp",
        description: "Escolha frases incríveis para seu status ou recado.",
        url: "https://chamanozap.net/100-frases-para-recado-do-whatsapp-veja-as-melhores",
        external: true,
        icon: MessageCircle,
    },
];

export default function MensagensPage() {
    return (
        <main className="min-h-screen bg-[#f5f3ef] py-4 sm:py-6 px-2 sm:px-4">
            <div className="max-w-5xl mx-auto">
                {/* Cabeçalho */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                    <div className="flex items-center gap-3 mb-4">
                        <MessageCircle className="w-8 h-8 text-green-600" />
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                            Mensagens para WhatsApp
                        </h1>
                    </div>
                    <p className="text-gray-600 text-lg">
                        Encontre mensagens prontas para compartilhar com amigos, família e colegas.
                    </p>
                </div>

                {/* Lista de Mensagens */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {messages.map((msg) => {
                        const Icon = msg.icon || MessageCircle;
                        return (
                            <a
                                key={msg.id}
                                href={msg.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 group block"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                                            <Icon className="w-6 h-6 text-green-600" />
                                        </div>
                                        <div>
                                            <h2 className="text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                                                {msg.name}
                                            </h2>
                                            <p className="text-sm text-gray-500">Acessar</p>
                                        </div>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {msg.description}
                                </p>
                            </a>
                        );
                    })}
                </div>

                {/* Estatísticas */}
                <div className="bg-white rounded-xl shadow-md p-6 mt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Estatísticas das Mensagens
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div>
                            <div className="text-2xl font-bold text-green-600">
                                {messages.length}
                            </div>
                            <div className="text-sm text-gray-600">Mensagens</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-blue-600">-</div>
                            <div className="text-sm text-gray-600">Mais Compartilhada</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-purple-600">-</div>
                            <div className="text-sm text-gray-600">Favorita</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-orange-600">-</div>
                            <div className="text-sm text-gray-600">Nova</div>
                        </div>
                    </div>
                </div>

                {/* Navegação */}
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
