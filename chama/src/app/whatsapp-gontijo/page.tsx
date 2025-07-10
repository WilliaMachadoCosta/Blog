'use client';

import { MessageSquare, Phone, Mail, MapPin, Clock, Star } from "lucide-react";
import type { Metadata } from "next";
import Head from "next/head";

export default function WhatsAppGontijoPage() {
  return (
    <>
      <Head>
        <title>WhatsApp Gontijo - Contato Direto | Chama no Zap</title>
        <meta name="description" content="Entre em contato com a Gontijo via WhatsApp, telefone ou email. Atendimento rápido e eficiente para suas necessidades de transporte rodoviário." />
        <meta name="keywords" content="WhatsApp Gontijo, contato Gontijo, SAC Gontijo, telefone Gontijo, email Gontijo, transporte rodoviário" />
        <meta property="og:title" content="WhatsApp Gontijo - Contato Direto" />
        <meta property="og:description" content="Entre em contato com a Gontijo via WhatsApp, telefone ou email. Atendimento rápido e eficiente." />
        <meta property="og:url" content="https://chamanozap.net/whatsapp-gontijo" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="WhatsApp Gontijo - Contato Direto" />
        <meta name="twitter:description" content="Entre em contato com a Gontijo via WhatsApp, telefone ou email." />
        <link rel="canonical" href="https://chamanozap.net/whatsapp-gontijo" />
      </Head>
      <main className="min-h-screen bg-[#f5f3ef] py-4 sm:py-6 px-2 sm:px-4 overflow-x-hidden">
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "WhatsApp Gontijo",
              "description": "Entre em contato com a Gontijo via WhatsApp, telefone ou email. Atendimento rápido e eficiente para suas necessidades.",
              "url": "https://chamanozap.net/whatsapp-gontijo",
              "telephone": "+55-31-3271-7000",
              "email": "sac@gontijo.com.br",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "BR",
                "addressRegion": "MG",
                "addressLocality": "Belo Horizonte"
              },
              "sameAs": [
                "https://www.gontijo.com.br"
              ]
            })
          }}
        />

        <div className="max-w-4xl mx-auto">
          {/* Header da página */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <MessageSquare className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                WhatsApp Gontijo
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
                Entre em contato com a Gontijo de forma rápida e eficiente.
                Nossa equipe está pronta para atender você via WhatsApp, telefone ou email.
              </p>
            </div>
          </div>

          {/* Botões de contato principais */}
          <div className="grid gap-4 mb-8">
            {/* WhatsApp Button */}
            <a
              href="https://wa.me/553132717000"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border border-green-400"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">WhatsApp Gontijo</h3>
                    <p className="text-green-100 text-sm">Atendimento via WhatsApp</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-semibold text-lg">(31) 3271-7000</div>
                  <div className="text-green-100 text-sm">Clique para conversar</div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </a>

            {/* SAC Button */}
            <a
              href="tel:08007017000"
              className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border border-blue-400"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">SAC Gontijo</h3>
                    <p className="text-blue-100 text-sm">Central de Atendimento</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-semibold text-lg">0800 701 7000</div>
                  <div className="text-blue-100 text-sm">Ligue gratuitamente</div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </a>

            {/* Email Button */}
            <a
              href="mailto:sac@gontijo.com.br"
              className="group relative overflow-hidden bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border border-purple-400"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">Email Gontijo</h3>
                    <p className="text-purple-100 text-sm">Atendimento por email</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-semibold text-lg">sac@gontijo.com.br</div>
                  <div className="text-purple-100 text-sm">Envie sua mensagem</div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </a>
          </div>

          {/* Informações da empresa */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Star className="w-6 h-6 text-yellow-500 mr-2" />
              Sobre a Gontijo
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Nossa História</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  A Gontijo é uma das principais empresas de transporte rodoviário de passageiros do Brasil,
                  com mais de 70 anos de experiência no mercado. Oferecemos serviços de qualidade,
                  conforto e segurança para milhares de passageiros diariamente.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Nossa missão é conectar pessoas e lugares, proporcionando viagens seguras e confortáveis
                  com uma frota moderna e equipe altamente qualificada.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Nossos Diferenciais</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Frota moderna e confortável
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Atendimento 24 horas
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Segurança em primeiro lugar
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Cobertura nacional
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Preços competitivos
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Informações de contato detalhadas */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Phone className="w-6 h-6 text-blue-500 mr-2" />
              Informações de Contato
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">WhatsApp</h4>
                    <p className="text-gray-600">(31) 3271-7000</p>
                    <p className="text-sm text-gray-500">Atendimento via WhatsApp</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">SAC</h4>
                    <p className="text-gray-600">0800 701 7000</p>
                    <p className="text-sm text-gray-500">Central de Atendimento</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Email</h4>
                    <p className="text-gray-600">sac@gontijo.com.br</p>
                    <p className="text-sm text-gray-500">Atendimento por email</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Endereço</h4>
                    <p className="text-gray-600">Belo Horizonte, MG</p>
                    <p className="text-sm text-gray-500">Sede administrativa</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Horário de Atendimento</h4>
                    <p className="text-gray-600">24 horas por dia</p>
                    <p className="text-sm text-gray-500">7 dias por semana</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Star className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Site Oficial</h4>
                    <a
                      href="https://www.gontijo.com.br"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      www.gontijo.com.br
                    </a>
                    <p className="text-sm text-gray-500">Visite nosso site</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Final */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-center text-white shadow-lg">
            <h3 className="text-2xl font-bold mb-3">Precisa de ajuda?</h3>
            <p className="text-green-100 mb-4 text-lg">
              Nossa equipe está pronta para atender você. Escolha a forma de contato que preferir!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://wa.me/553132717000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-green-600 font-semibold rounded-lg hover:bg-green-50 transition-colors"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                WhatsApp
              </a>
              <a
                href="tel:08007017000"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-green-600 font-semibold rounded-lg hover:bg-green-50 transition-colors"
              >
                <Phone className="w-5 h-5 mr-2" />
                Ligar Agora
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
} 