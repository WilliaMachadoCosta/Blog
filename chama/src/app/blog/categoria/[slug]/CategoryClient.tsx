'use client';

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Tag, Calendar, User, BookOpen } from "lucide-react";
import { IPost } from "@/models/interfaces/post";
import { ICategory } from "@/services/categoryServices";

interface CategoryClientProps {
  category: ICategory;
  posts: IPost[];
}

export const runtime = 'edge';
export default function CategoryClient({ category, posts }: CategoryClientProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header da Categoria */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-3 mb-4">
          <Link
            href="/blog"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <Tag className="w-8 h-8 text-green-600" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {category.name}
            </h1>
            <p className="text-gray-600 text-sm">
              Posts nesta categoria
            </p>
          </div>
        </div>
        {category.description && (
          <p className="text-gray-600 text-lg">
            {category.description}
          </p>
        )}
      </div>

      {/* Lista de Posts da Categoria */}
      <div className="space-y-4">
        {posts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Nenhum post encontrado
            </h3>
            <p className="text-gray-600 mb-4">
              Não há posts disponíveis na categoria "{category.name}" no momento.
            </p>
            <Link
              href="/blog"
              className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Ver todos os posts
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <Link href={`/${post.slug}`}>
                  <div className="flex flex-col md:flex-row">
                    {/* Imagem do post */}
                    <div className="md:w-1/3">
                      <Image
                        src={post.featuredImage}
                        alt={post.title.replace(/<[^>]*>/g, "")}
                        width={400}
                        height={300}
                        className="w-full h-48 md:h-full object-cover"
                        loading="lazy"
                      />
                    </div>

                    {/* Conteúdo do post */}
                    <div className="flex-1 p-4 md:p-6">
                      <h2
                        className="text-lg sm:text-xl font-bold text-gray-900 mb-3 line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: post.title }}
                      />

                      <p className="text-gray-600 mb-4 line-clamp-3 text-sm sm:text-base">
                        {post.excerpt.replace(/<[^>]*>/g, "")}
                      </p>

                      {/* Meta informações */}
                      <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <time dateTime={post.date}>
                            {formatDate(post.date)}
                          </time>
                        </div>
                        <div className="flex items-center gap-1">
                          <Tag className="w-4 h-4" />
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                            {category.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Estatísticas da Categoria */}
      {posts.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Estatísticas da Categoria
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">{posts.length}</div>
              <div className="text-sm text-gray-600">Posts</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {new Set(posts.map(p => p.author)).size}
              </div>
              <div className="text-sm text-gray-600">Autores</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">
                {posts.filter(p => new Date(p.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length}
              </div>
              <div className="text-sm text-gray-600">Últimos 30 dias</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">
                {posts.filter(p => new Date(p.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}
              </div>
              <div className="text-sm text-gray-600">Última semana</div>
            </div>
          </div>
        </div>
      )}

      {/* Voltar ao Blog */}
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao Blog
        </Link>
      </div>
    </div>
  );
} 