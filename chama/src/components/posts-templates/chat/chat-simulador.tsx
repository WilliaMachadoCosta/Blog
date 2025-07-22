'use client'

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { MessageCircle, Phone, Globe, User, FileText } from 'lucide-react';
import Link from 'next/link';

interface EmpresaData {
    nome: string;
    whatsapp: string;
    telefone: string;
    site: string;
}

type Mensagem = {
    id: number;
    fromUser: boolean; // se for pergunta do usuário ou resposta do sistema
    texto: React.ReactNode;
};

export default function ConversasPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [empresa, setEmpresa] = useState<EmpresaData>({
        nome: '',
        whatsapp: '',
        telefone: '',
        site: '',
    });

    const [mensagens, setMensagens] = useState<Mensagem[]>([]);
    const [indiceMensagem, setIndiceMensagem] = useState(0);

    useEffect(() => {
        setEmpresa({
            nome: searchParams.get('nome') || '',
            whatsapp: searchParams.get('whatsapp') || '',
            telefone: searchParams.get('telefone') || '',
            site: searchParams.get('site') || '',
        });
    }, [searchParams]);

    // Construir o roteiro das mensagens simuladas com base nos dados
    const roteiro = [
        {
            fromUser: true,
            texto: `Qual o WhatsApp da empresa ${empresa.nome || 'X'}?`,
        },
        {
            fromUser: false,
            texto: empresa.whatsapp ? (
                <>
                    O WhatsApp da empresa é:{" "}
                    <Link
                        href={`https://wa.me/${empresa.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-700 underline"
                    >
                        {empresa.whatsapp}
                    </Link>
                </>
            ) : (
                "Desculpe, não tenho o WhatsApp da empresa."
            ),
        },
        {
            fromUser: true,
            texto: "E o telefone?",
        },
        {
            fromUser: false,
            texto: empresa.telefone ? (
                <>
                    O telefone da empresa é: <span>{empresa.telefone}</span>
                </>
            ) : (
                "Desculpe, não tenho o telefone da empresa."
            ),
        },
        {
            fromUser: true,
            texto: "E o site da empresa?",
        },
        {
            fromUser: false,
            texto: empresa.site ? (
                <>
                    O site da empresa é:{" "}
                    <Link
                        href={empresa.site}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                    >
                        {empresa.site}
                    </Link>
                </>
            ) : (
                "Desculpe, não tenho o site da empresa."
            ),
        },
    ];

    // Lógica para exibir mensagens uma a uma, com delay
    useEffect(() => {
        if (indiceMensagem < roteiro.length) {
            const timer = setTimeout(() => {
                setMensagens((msgs) => [...msgs, { id: indiceMensagem, ...roteiro[indiceMensagem] }]);
                setIndiceMensagem(indiceMensagem + 1);
            }, 1500); // 1.5 segundos entre mensagens
            return () => clearTimeout(timer);
        }
    }, [indiceMensagem, roteiro]);

    return (
        <main className="flex flex-col items-center justify-start min-h-screen bg-[#e5ddd5] p-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow p-6 flex flex-col space-y-4">
                <div className="flex items-center space-x-3 border-b pb-3 mb-4">
                    <MessageCircle className="text-green-600" size={24} />
                    <h1 className="text-2xl font-semibold">{empresa.nome || "Empresa Desconhecida"}</h1>
                </div>

                <div className="flex flex-col space-y-3 max-h-[400px] overflow-y-auto px-2">
                    {mensagens.map(({ id, fromUser, texto }) => (
                        <div
                            key={id}
                            className={`max-w-[80%] px-4 py-2 rounded-lg ${fromUser ? "self-end bg-green-600 text-white" : "self-start bg-gray-200 text-gray-900"
                                }`}
                        >
                            {texto}
                        </div>
                    ))}
                </div>

                <button
                    type="button"
                    onClick={() => router.back()}
                    className="mt-6 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                    Voltar
                </button>
            </div>
        </main>
    );
}
