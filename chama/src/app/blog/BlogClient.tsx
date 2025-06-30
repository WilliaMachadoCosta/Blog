'use client';

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, Filter, Calendar, User, Tag, ChevronDown, Home } from "lucide-react";
import { IPost } from "@/models/interfaces/post";
import { ICategory } from "@/services/categoryServices";
import { getPostsByCategorySlug } from "@/services/postServices";
import { SpinLoader } from "@/components/SpinLoad/SpinLoader";

interface BlogClientProps {
  initialPosts: IPost[];
  categories: ICategory[];
}

export default function BlogClient({ initialPosts, categories }: BlogClientProps) {
  const [posts, setPosts] = useState<IPost[]>(initialPosts);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fechar dropdown quando clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCategoryFilter = async (categorySlug: string) => {
    setIsLoading(true);
    setSelectedCategory(categorySlug);
    setIsDropdownOpen(false);

    try {
      if (categorySlug === "") {
        // Reset para todos os posts
        setPosts(initialPosts);
      } else {
        const filteredPosts = await getPostsByCategorySlug(categorySlug);
        setPosts(filteredPosts);
      }
    } catch (error) {
      console.error("Erro ao filtrar posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const selectedCategoryName = selectedCategory
    ? categories.find(cat => cat.slug === selectedCategory)?.name
    : "Todas as categorias";

  return (
    <div className="space-y-6">
      {/* Header do Blog com Botão Início */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-green-600" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Blog
            </h1>
          </div>

          {/* Botão Início */}
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">Início</span>
          </Link>
        </div>
        <p className="text-gray-600 text-lg">
          Descubra artigos, dicas e informações sobre as principais empresas e serviços do Brasil.
        </p>
      </div>

      {/* Filtro por Categoria */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="text-gray-700 font-medium">Filtrar por categoria:</span>
          </div>

          {/* Dropdown de Categorias */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors min-w-[200px] justify-between"
            >
              <span className="text-gray-900">{selectedCategoryName}</span>
              <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                <button
                  onClick={() => handleCategoryFilter("")}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors border-b border-gray-100"
                >
                  <div className="font-medium text-gray-900">Todas as categorias</div>
                  <div className="text-sm text-gray-500">Ver todos os posts</div>
                </button>

                {categories.map((category) => (
                  <button
                    key={category.slug}
                    onClick={() => handleCategoryFilter(category.slug)}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors border-b border-gray-100 last:border-b-0"
                  >
                    <div className="font-medium text-gray-900">{category.name}</div>
                    <div className="text-sm text-gray-500">{category.description}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Categoria Selecionada */}
        {selectedCategory && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-green-600" />
              <span className="text-green-800 font-medium">
                Mostrando posts da categoria: {selectedCategoryName}
              </span>
              <button
                onClick={() => handleCategoryFilter("")}
                className="ml-auto text-green-600 hover:text-green-800 text-sm underline"
              >
                Limpar filtro
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Lista de Posts */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="flex justify-center py-8">
            <SpinLoader />
          </div>
        ) : posts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Nenhum post encontrado
            </h3>
            <p className="text-gray-600 mb-4">
              {selectedCategory
                ? `Não há posts disponíveis na categoria "${selectedCategoryName}" no momento.`
                : "Não há posts disponíveis no momento."
              }
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              <Home className="w-4 h-4" />
              Voltar ao Início
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <Link href={`/${post.slug}`} className="block">
                  <div className="flex flex-col md:flex-row">
                    {/* Conteúdo do post */}
                    <div className="flex-1 p-6">
                      <h2
                        className="font-bold text-gray-900 mb-3 text-xl md:text-2xl line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: post.title }}
                      />
                      <p className="text-gray-600 mb-4 line-clamp-3 text-base">
                        {post.excerpt.replace(/<[^>]*>/g, "")}
                      </p>

                      {/* Meta informações */}
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(post.date)}</span>
                          </div>
                        </div>

                        {/* Categoria */}
                        {post.categories && post.categories.length > 0 && (
                          <div className="flex items-center gap-2">
                            <Tag className="w-4 h-4" />
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                              {post.categories.length} categoria(s)
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Imagem do post */}
                    <div className="relative w-full md:w-64 h-48 md:h-auto md:min-h-full">
                      <Image
                        src={post.featuredImage}
                        alt={post.title.replace(/<[^>]*>/g, "")}
                        fill
                        className="object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
