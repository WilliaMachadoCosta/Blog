import { Suspense } from "react";
import { getAllPosts } from "@/services/postServices";
import { getAllCategories } from "@/services/categoryServices";
import { SpinLoader } from "@/components/SpinLoad/SpinLoader";
import BlogClient from "./BlogClient";

export const runtime = 'edge';
export default async function BlogPage() {
  return (
    <div className="min-h-screen bg-[#f5f3ef] py-4 px-2 sm:px-4">
      <div className="max-w-6xl mx-auto">
        <Suspense fallback={<SpinLoader />}>
          <BlogContent />
        </Suspense>
      </div>
    </div>
  );
}

async function BlogContent() {
  try {
    // Buscar posts e categorias
    const posts = await getAllPosts();
    const categories = getAllCategories();

    console.log("Posts encontrados:", posts.length);
    console.log("Categorias encontradas:", categories.length);

    // Se não há posts, mostrar mensagem amigável
    if (!posts || posts.length === 0) {
      return (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog</h1>
          <p className="text-gray-600 mb-4">
            Não há posts disponíveis no momento. Tente novamente mais tarde.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Voltar ao Início
          </a>
        </div>
      );
    }

    return <BlogClient initialPosts={posts} categories={categories} />;
  } catch (error) {
    console.error("Erro ao carregar blog:", error);
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Erro ao carregar o blog</h1>
        <p className="text-gray-600 mb-4">
          Houve um problema ao carregar os posts. Tente novamente mais tarde.
        </p>
        <p className="text-sm text-red-600 mb-4">
          Erro: {error instanceof Error ? error.message : 'Erro desconhecido'}
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
        >
          Voltar ao Início
        </a>
      </div>
    );
  }
} 