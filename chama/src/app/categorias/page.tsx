import Link from "next/link";
import { getAllCategories } from "@/services/categoryServices";
import { Tag, ArrowRight, BookOpen } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categorias | Blog",
  description: "Explore todas as categorias de artigos disponíveis no nosso blog.",
};
export const runtime = 'edge';
export default async function CategoriesPage() {
  const categories = getAllCategories();

  return (
    <main className="min-h-screen bg-[#f5f3ef] py-4 sm:py-6 px-2 sm:px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Tag className="w-8 h-8 text-green-600" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Categorias
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Explore nossos artigos organizados por categorias. Encontre conteúdo específico sobre os temas que mais te interessam.
          </p>
        </div>

        {/* Lista de Categorias */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/blog/categoria/${category.slug}`}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                    <Tag className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                      {category.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                      Ver posts
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
              </div>

              {category.description && (
                <p className="text-gray-600 text-sm leading-relaxed">
                  {category.description}
                </p>
              )}
            </Link>
          ))}
        </div>

        {/* Estatísticas */}
        <div className="bg-white rounded-xl shadow-md p-6 mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Estatísticas das Categorias
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">
                {categories.length}
              </div>
              <div className="text-sm text-gray-600">Categorias</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                -
              </div>
              <div className="text-sm text-gray-600">Total de Posts</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">
                -
              </div>
              <div className="text-sm text-gray-600">Categorias com Posts</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">
                -
              </div>
              <div className="text-sm text-gray-600">Mais Posts</div>
            </div>
          </div>
        </div>

        {/* Botões de Navegação */}
        <div className="bg-white rounded-xl shadow-md p-6 mt-6 text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              Ver Todos os Posts
            </Link>
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