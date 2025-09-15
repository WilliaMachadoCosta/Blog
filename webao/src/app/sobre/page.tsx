'use client';

import Link from "next/link";
import { Building, Users, MessageSquare, Phone, Mail, Globe } from "lucide-react";
import GoogleAd from "@/components/banner/google-ads";

export default function SobrePage() {
    return (
        <div className="min-h-screen bg-[#f5f3ef] py-4 px-2 sm:px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header da página */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Building className="w-8 h-8 text-orange-600" />
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                            Quem Somos
                        </h1>
                    </div>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        A <strong>Webao</strong> é sua plataforma de suporte técnico e desenvolvimento de sistemas.
                        Oferecemos soluções completas para sua empresa com foco em tecnologia e inovação.
                    </p>
                </div>

                <div className="my-6 max-w-2xl mx-auto w-full h-[350px] rounded-lg relative">
                    <div className=" border-b-indigo-800">
                        <GoogleAd />
                    </div>
                </div>
                {/* Missão e Visão */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <Users className="w-6 h-6 text-blue-600" />
                            Nossa Missão
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            Conectar pessoas às empresas de forma rápida, eficiente e transparente,
                            eliminando barreiras de comunicação e facilitando o acesso aos serviços essenciais.
                        </p>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <Globe className="w-6 h-6 text-orange-600" />
                            Nossa Visão
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            Ser a principal plataforma de conexão entre consumidores e empresas no Brasil,
                            oferecendo uma experiência única e inovadora de comunicação.
                        </p>
                    </div>
                </div>

                {/* O que fazemos */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                        O que Fazemos
                    </h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <MessageSquare className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                            <h3 className="font-semibold text-gray-900 mb-2">Conexão Direta</h3>
                            <p className="text-sm text-gray-600">
                                Conectamos você diretamente com as empresas via WhatsApp, telefone e outros canais
                            </p>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <Phone className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                            <h3 className="font-semibold text-gray-900 mb-2">Informações Atualizadas</h3>
                            <p className="text-sm text-gray-600">
                                Mantemos dados de contato sempre atualizados das principais empresas
                            </p>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <Building className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                            <h3 className="font-semibold text-gray-900 mb-2">Facilidade de Uso</h3>
                            <p className="text-sm text-gray-600">
                                Interface simples e intuitiva para encontrar e contatar empresas rapidamente
                            </p>
                        </div>
                    </div>
                </div>

                {/* Valores */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                        Nossos Valores
                    </h2>
                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                            <div>
                                <h3 className="font-semibold text-gray-900">Transparência</h3>
                                <p className="text-gray-600 text-sm">Fornecemos informações claras e precisas sobre as empresas</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                            <div>
                                <h3 className="font-semibold text-gray-900">Eficiência</h3>
                                <p className="text-gray-600 text-sm">Processo rápido e direto para conectar você às empresas</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                            <div>
                                <h3 className="font-semibold text-gray-900">Confiabilidade</h3>
                                <p className="text-gray-600 text-sm">Dados verificados e atualizados regularmente</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                            <div>
                                <h3 className="font-semibold text-gray-900">Inovação</h3>
                                <p className="text-gray-600 text-sm">Sempre buscando melhorar a experiência do usuário</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="bg-gradient-to-r from-orange-600 to-blue-600 rounded-lg shadow-md p-6 text-center text-white">
                    <h2 className="text-xl font-semibold mb-3">
                        Comece a Usar Agora
                    </h2>
                    <p className="mb-4 text-orange-100">
                        Encontre e conecte-se com as empresas que você precisa de forma rápida e eficiente.
                    </p>
                    <Link
                        href="/"
                        className="inline-block bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                    >
                        Voltar ao Início
                    </Link>
                </div>

                {/* Informações de contato */}
                <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                        Entre em Contato
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3">
                            <Mail className="w-5 h-5 text-gray-600" />
                            <div>
                                <p className="font-semibold text-gray-900">Email</p>
                                <p className="text-gray-600 text-sm">williamhp3@gmail.com</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <MessageSquare className="w-5 h-5 text-gray-600" />
                            <div>
                                <p className="font-semibold text-gray-900">WhatsApp</p>
                                <p className="text-gray-600 text-sm">(11) 989710114</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
