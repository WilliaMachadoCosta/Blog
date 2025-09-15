'use client'

import { useState } from 'react'
import Head from 'next/head'
import GoogleAd from '@/components/banner/google-ads'

export default function GerarLinkWhatsApp() {
    const [telefone, setTelefone] = useState('')
    const [linkGerado, setLinkGerado] = useState('')
    const [copiado, setCopiado] = useState(false)
    const [mensagem, setMensagem] = useState('')

    const gerarLink = () => {
        const numeroLimpo = telefone.replace(/\D/g, '')
        const regexNumeroValido = /^55\d{10,11}$/

        if (regexNumeroValido.test(numeroLimpo)) {
            const mensagemCodificada = encodeURIComponent(mensagem.trim())
            const link = mensagemCodificada
                ? `https://wa.me/${numeroLimpo}?text=${mensagemCodificada}`
                : `https://wa.me/${numeroLimpo}`
            setLinkGerado(link)
            setCopiado(false)
        } else {
            alert('Digite um número válido no formato: 55 + DDD + número (ex: 5511987654321)')
        }
    }

    const copiarLink = async () => {
        if (linkGerado) {
            await navigator.clipboard.writeText(linkGerado)
            setCopiado(true)
        }
    }

    return (
        <>
            <Head>
                <title>Gerador de Link do WhatsApp com Mensagem | Grátis e Sem Cadastro</title>
                <meta
                    name="description"
                    content="Ferramenta online gratuita para gerar link do WhatsApp com mensagem automática. Ideal para empresas, redes sociais, atendimento e marketing. Fácil de usar, rápido e direto."
                />
                <meta name="robots" content="index, follow" />
                <meta property="og:title" content="Gerador de Link WhatsApp com Mensagem Automática" />
                <meta property="og:description" content="Gere um link personalizado do WhatsApp com texto automático e compartilhe em sites, QR Codes ou redes sociais." />
                <meta property="og:image" content="/logo.png" />
                <meta property="og:url" content="https://webao.info/gerar-link-do-whatsapp-converse-facilmente" />
            </Head>

            <main className="bg-[#f5f3ef] py-6 sm:py-10 px-4">
                <article className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6 sm:p-8 space-y-6">

                    <header className="text-center">
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
                            Gerador de Link do WhatsApp com Mensagem
                        </h1>
                        <p className="text-gray-600 text-base sm:text-lg">
                            Crie links personalizados do WhatsApp com mensagens automáticas. Perfeito para atendimento, vendas, suporte, marketing digital e redes sociais.
                        </p>
                    </header>

                    <section className="space-y-4">
                        <p className="text-gray-700 text-sm sm:text-base">
                            O <strong>link do WhatsApp com mensagem personalizada</strong> permite que você envie seus contatos diretamente para uma conversa com um texto já preenchido. Isso é ideal para facilitar o atendimento ao cliente, acelerar respostas em campanhas ou colocar um botão de contato rápido no seu site.
                        </p>

                        <section className="pt-6 border-t border-gray-200">
                            <span className='flex text-center justify-center text-black text-xs'>Publicidade</span>
                            <GoogleAd />
                        </section>

                        <p className="text-gray-700 text-sm sm:text-base">
                            Basta informar o número de telefone no formato internacional (ex: 55 + DDD + número) e, opcionalmente, escrever uma mensagem que será automaticamente inserida no chat. O link gerado pode ser compartilhado em redes sociais, adicionado à bio do Instagram, enviado por e-mail ou transformado em QR Code.
                        </p>
                    </section>

                    <section className="border border-gray-200 rounded-lg p-5">
                        <h2 className="text-xl font-semibold mb-3">Preencha os campos abaixo:</h2>

                        <input
                            type="tel"
                            placeholder="Ex: 5511999998888"
                            value={telefone}
                            onChange={(e) => setTelefone(e.target.value)}
                            className="w-full p-3 mb-4 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-green-500"
                        />

                        <textarea
                            placeholder="Digite a mensagem automática (opcional)"
                            value={mensagem}
                            onChange={(e) => setMensagem(e.target.value)}
                            className="w-full p-3 mb-4 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                        />

                        <button
                            onClick={gerarLink}
                            className="bg-green-600 hover:bg-green-700 text-white w-full py-3 rounded-md font-semibold transition-colors"
                        >
                            Gerar Link do WhatsApp
                        </button>

                        {linkGerado && (
                            <div className="mt-6">
                                <p className="font-semibold mb-2">Link gerado:</p>
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
                                    {copiado ? 'Link copiado!' : 'Copiar Link'}
                                </button>
                            </div>
                        )}
                    </section>

                    <section className="pt-6 border-t border-gray-200">
                        <h2 className="text-xl font-semibold mb-3">Dúvidas Frequentes</h2>
                        <ul className="text-sm text-gray-700 space-y-2">
                            <li><strong>O que é?</strong> Um gerador gratuito de links do WhatsApp com mensagens automáticas.</li>
                            <li><strong>Preciso me cadastrar?</strong> Não. Basta preencher e gerar o link.</li>
                            <li><strong>Funciona internacionalmente?</strong> Sim! Use o código do país corretamente.</li>
                            <li><strong>Posso encurtar ou rastrear?</strong> Sim. Use encurtadores como Bitly ou Google Analytics com redirecionamento.</li>
                            <li><strong>Funciona em bio do Instagram?</strong> Perfeitamente! Também funciona em e-mail, site ou impresso via QR Code.</li>
                        </ul>
                    </section>

                    <section className="pt-6 border-t border-gray-200">
                        <h2 className="text-xl font-semibold mb-3">Como usar o link gerado?</h2>
                        <ol className="list-decimal list-inside text-gray-700 space-y-1 text-sm">
                            <li>Copie o link gerado acima.</li>
                            <li>Cole na bio do Instagram, botão do seu site ou anúncio.</li>
                            <li>Compartilhe em grupos ou envie por direct.</li>
                            <li>Use com ferramentas de QR Code para atendimento físico.</li>
                        </ol>
                    </section>

                    <section className="pt-6 border-t border-gray-200">
                        <span className='flex text-center justify-center text-black text-xs'>Publicidade</span>
                        <GoogleAd />
                    </section>

                </article>
            </main>
        </>
    )
}
