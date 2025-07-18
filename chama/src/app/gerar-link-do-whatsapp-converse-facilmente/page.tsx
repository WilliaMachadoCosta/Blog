'use client'

import { useState } from 'react'
import Head from 'next/head'
import GoogleAd from '@/components/banner/google-ads'

export default function GerarLinkWhatsApp() {
    const [telefone, setTelefone] = useState('')
    const [linkGerado, setLinkGerado] = useState('')
    const [copiado, setCopiado] = useState(false)
    const [mensagem, setMensagem] = useState('');

    const gerarLink = () => {
        const numeroLimpo = telefone.replace(/\D/g, '');
        const regexNumeroValido = /^55\d{10,11}$/;

        if (regexNumeroValido.test(numeroLimpo)) {
            const mensagemCodificada = encodeURIComponent(mensagem.trim());
            const link = mensagemCodificada
                ? `https://wa.me/${numeroLimpo}?text=${mensagemCodificada}`
                : `https://wa.me/${numeroLimpo}`;
            setLinkGerado(link);
            setCopiado(false);
        } else {
            alert('Digite um número válido no formato: 55 + DDD + número (ex: 5511987654321)');
        }
    };

    const copiarLink = async () => {
        if (linkGerado) {
            await navigator.clipboard.writeText(linkGerado)
            setCopiado(true)
        }
    }

    return (
        <>
            <Head>
                <title>Gerador de Link do WhatsApp | Converse Facilmente</title>
                <meta
                    name="description"
                    content="Gere um link personalizado para o WhatsApp e inicie conversas diretamente. Simples, rápido e eficiente."
                />
                <meta name="robots" content="index, follow" />
                <meta property="og:title" content="Gerar Link WhatsApp" />
                <meta
                    property="og:description"
                    content="Crie um link do WhatsApp com seu número de telefone em poucos cliques."
                />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="/logo.png" />
                <meta property="og:url" content="https://chamanozap.net/gerar-link-do-whatsapp-converse-facilmente" />
            </Head>

            <section className="bg-white max-w-2xl mx-auto mt-6 rounded-xl shadow-md p-3 sm:p-4 md:p-2 space-y-4 sm:space-y-6 overflow-hidden">
                <span className='flex text-center justify-center text-black text-xs'>Publicidade</span>
                <GoogleAd />
            </section>

            <main className="min-h-screen bg-[#f5f3ef] py-4 sm:py-8 px-2 sm:px-4 overflow-x-hidden flex items-center justify-center">

                <article className="bg-white max-w-2xl mx-auto mt-2 rounded-xl shadow-md p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6 overflow-hidden">

                    <div className="bg-white text-gray-900 rounded-2xl shadow-lg p-6 w-full max-w-sm text-center border border-gray-200">
                        <h1 className="text-xl font-bold mb-2">Gerar Link do WhatsApp - Converse Facilmente</h1>
                        <p className="text-sm mb-4 text-gray-700">
                            Gere um link personalizado para o WhatsApp e inicie conversas diretamente. Simples, rápido e eficiente.
                        </p>

                        <h2 className="text-lg font-semibold mb-3">Gerar Link do WhatsApp</h2>
                        <p className="text-sm mb-4 text-gray-600">
                            Insira seu número de telefone com DDD e clique em <strong>Gerar Link</strong>.
                        </p>

                        <input
                            type="tel"
                            placeholder="Ex: 5511987654321"
                            value={telefone}
                            onChange={(e) => setTelefone(e.target.value)}
                            className="w-full p-3 mb-4 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <textarea
                            placeholder="Digite sua mensagem (opcional)"
                            value={mensagem}
                            onChange={(e) => setMensagem(e.target.value)}
                            className="w-full p-3 mb-4 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                        />


                        <button
                            onClick={gerarLink}
                            className="bg-green-600 hover:bg-green-700 text-white w-full py-3 rounded-md font-semibold transition-colors"
                        >
                            Gerar Link
                        </button>

                        {linkGerado && (
                            <div className="mt-6">
                                <p className="font-semibold mb-2">Seu link do WhatsApp:</p>
                                <a
                                    href={linkGerado}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-green-600 hover:underline break-all"
                                >
                                    {linkGerado}
                                </a>

                                <button
                                    onClick={copiarLink}
                                    className="mt-4 bg-blue-500 hover:bg-blue-600 text-white w-full py-2 rounded-md font-semibold"
                                >
                                    {copiado ? 'Link copiado!' : 'Clique aqui para copiar'}
                                </button>
                            </div>
                        )}
                    </div>

                </article>
            </main>

        </>
    )
}
