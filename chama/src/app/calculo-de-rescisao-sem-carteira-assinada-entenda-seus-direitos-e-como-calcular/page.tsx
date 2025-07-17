// src/app/calculo-de-rescisao-sem-carteira-assinada-entenda-seus-direitos-e-como-calcula/page.tsx

import CalculatorWrapper from '@/components/utils/calculatorWrapper';
import { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
    title: "Cálculo de Rescisão sem Carteira Assinada [CALCULADORA]",
    description:
        "Entenda seus direitos trabalhistas e saiba como calcular a rescisão sem carteira assinada. Utilize nossa calculadora prática para trabalhadores informais.",
    keywords:
        "rescisão sem carteira assinada, cálculo rescisão, direitos trabalhador informal, férias proporcionais, aviso prévio, 13º salário, cálculo rescisão informal",
    robots: "index, follow",
    openGraph: {
        title: "Cálculo de Rescisão sem Carteira Assinada [CALCULADORA]",
        description:
            "Saiba como calcular a rescisão trabalhista mesmo sem carteira assinada. Direitos, explicações e ferramenta interativa para trabalhadores informais.",
        url: "https://seusite.com/calculo-de-rescisao-sem-carteira-assinada-entenda-seus-direitos-e-como-calcula",
        siteName: "SeuSite",
        locale: "pt_BR",
        type: "article",
    },
};

export default function Page() {
    return (
        <>
            {/* JSON-LD para dados estruturados */}
            <Script
                id="ld-json"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Article",
                        headline:
                            "Cálculo de Rescisão sem Carteira Assinada [CALCULADORA]",
                        description:
                            "Entenda seus direitos trabalhistas e saiba como calcular a rescisão sem carteira assinada. Utilize nossa calculadora prática para trabalhadores informais.",
                        author: {
                            "@type": "Person",
                            name: "William Costa",
                        },
                        publisher: {
                            "@type": "Organization",
                            name: "SeuSite",
                            logo: {
                                "@type": "ImageObject",
                                url: "https://seusite.com/logo.png",
                            },
                        },
                        mainEntityOfPage: {
                            "@type": "WebPage",
                            "@id": "https://seusite.com/calculo-de-rescisao-sem-carteira-assinada-entenda-seus-direitos-e-como-calcula",
                        },
                        datePublished: "2025-07-17T12:00:00Z",
                        dateModified: "2025-07-17T12:00:00Z",
                    }),
                }}
            />
            <main className="max-w-3xl mx-auto py-8 px-4 text-gray-800" role="main" lang="pt-BR">
                <h1 className="text-3xl font-bold mb-6">
                    Cálculo de Rescisão sem Carteira Assinada [CALCULADORA]
                </h1>

                <p className="mb-6 leading-relaxed text-justify">
                    O <strong>cálculo da rescisão de contrato de trabalho sem carteira assinada</strong> gera muitas dúvidas entre trabalhadores informais e empregadores. Neste artigo completo, você vai entender seus direitos, os valores que podem ser devidos e como calcular cada verba rescisória corretamente. Além disso, disponibilizamos uma <strong>calculadora interativa</strong> para facilitar o cálculo da sua rescisão trabalhista. Confira!
                </p>

                <h2 className="text-2xl font-semibold mb-3" id="o-que-e-rescisao-contrato-trabalho">
                    O que é Rescisão de Contrato de Trabalho?
                </h2>
                <p className="mb-6 leading-relaxed text-justify">
                    A <strong>rescisão de contrato de trabalho</strong> ocorre quando a relação entre trabalhador e empregador é encerrada. Isso pode acontecer por diversos motivos, como demissão sem justa causa, pedido de demissão, rescisão por acordo, entre outros.
                </p>
                <p className="mb-6 font-semibold text-justify">
                    <em>Importante:</em> A rescisão de um contrato <strong>sem carteira assinada</strong> pode ser mais complexa, já que o trabalhador informal nem sempre possui os mesmos direitos trabalhistas garantidos pela CLT.
                </p>

                <h2 className="text-2xl font-semibold mb-3" id="direitos-trabalhador-informal">
                    Direitos do Trabalhador Informal
                </h2>
                <p className="mb-4 leading-relaxed text-justify">
                    Mesmo sem carteira assinada, o trabalhador informal pode ter direito a algumas verbas rescisórias, como:
                </p>
                <ul className="list-disc ml-6 mb-6">
                    <li>Salário proporcional — pagamento pelos dias efetivamente trabalhados no mês da rescisão;</li>
                    <li>Férias proporcionais — direito a férias proporcionais acrescidas de 1/3 sobre o valor;</li>
                    <li>13º salário proporcional — cálculo proporcional ao número de meses trabalhados no ano;</li>
                    <li>Aviso prévio — dependendo do tipo de rescisão, o trabalhador pode ter direito ao aviso prévio indenizado ou trabalhado.</li>
                </ul>

                <h2 className="text-2xl font-semibold mb-3" id="como-calcular-rescisao-sem-carteira-assinada">
                    Como Calcular a Rescisão sem Carteira Assinada
                </h2>
                <p className="mb-4 leading-relaxed text-justify">
                    Veja abaixo as fórmulas para calcular cada verba rescisória de forma clara e prática:
                </p>
                <ul className="list-disc ml-6 mb-6">
                    <li>
                        <strong>Salário Proporcional:</strong><br />
                        <code>Salário Proporcional = (Salário Mensal / 30) × Dias Trabalhados</code>
                    </li>
                    <li>
                        <strong>Férias Proporcionais:</strong><br />
                        <code>Férias Proporcionais = (Salário Mensal / 12) × Meses Trabalhados + 1/3 sobre este valor</code>
                    </li>
                    <li>
                        <strong>13º Salário Proporcional:</strong><br />
                        <code>13º Salário Proporcional = (Salário Mensal / 12) × Meses Trabalhados</code>
                    </li>
                    <li>
                        <strong>Aviso Prévio:</strong><br />
                        O aviso prévio pode ser devido em casos de demissão sem justa causa, sendo calculado conforme a duração contratual (mínimo 30 dias).
                    </li>
                </ul>

                <h2 className="text-2xl font-semibold mb-6" id="formulario-calculo-rescisao">
                    Formulário para Cálculo de Rescisão sem Carteira Assinada
                </h2>

                <CalculatorWrapper />

                <p className="mt-6 text-sm text-gray-600 italic text-justify">
                    Esta calculadora é uma ferramenta informativa e não substitui uma avaliação jurídica profissional. Para dúvidas específicas, consulte um advogado trabalhista.
                </p>
            </main>
        </>
    );
}
