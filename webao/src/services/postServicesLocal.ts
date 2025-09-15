// src/services/postServicesLocal.ts - Versão que usa API routes locais

import { IPost, WordPressPost } from "@/models/interfaces/post";

// Função para buscar posts via API route local
async function fetchFromLocalAPI(endpoint: string, params: Record<string, string> = {}) {
  const searchParams = new URLSearchParams(params);
  const url = `/api/posts${endpoint}?${searchParams.toString()}`;
  
  console.log('Fazendo requisição local:', url);
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Erro na API local: ${response.status}`);
  }
  
  return response.json();
}

export async function getAllPosts(): Promise<IPost[]> {
  try {
    const data = await fetchFromLocalAPI('', { per_page: '15' });
    return data.map(mapPost);
  } catch (err) {
    console.error("Erro em getAllPosts:", err);
    return [];
  }
}

export async function getCompanyPosts(): Promise<IPost[]> {
  try {
    const data = await fetchFromLocalAPI('', { category: 'empresas', per_page: '15' });
    return data.map(mapPost);
  } catch (err) {
    console.error("Erro em getCompanyPosts:", err);
    return [];
  }
}

export async function getAllPostsWithCompanies(): Promise<IPost[]> {
  try {
    // Buscar todos os posts incluindo empresas
    const [regularPosts, companyPosts] = await Promise.all([
      getAllPosts(),
      getCompanyPosts()
    ]);

    // Combinar e ordenar por data
    const allPosts = [...regularPosts, ...companyPosts];
    return allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (err) {
    console.error("Erro em getAllPostsWithCompanies:", err);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<IPost | null> {
  try {
    const data = await fetchFromLocalAPI('', { slug });
    return data.length ? mapPost(data[0]) : null;
  } catch (err) {
    console.error("Erro em getPostBySlug:", err);
    return null;
  }
}

export async function getPostsByCategorySlug(categorySlug: string): Promise<IPost[]> {
  try {
    const data = await fetchFromLocalAPI('', { category: categorySlug, per_page: '20' });
    return data.map(mapPost);
  } catch (err) {
    console.error("Erro em getPostsByCategorySlug:", err);
    return [];
  }
}

export async function searchPosts(query: string): Promise<IPost[]> {
  console.log('=== SEARCHPOSTS CHAMADA ===');
  console.log('Query recebida:', query);
  
  if (!query || query.trim().length < 4) {
    console.log('Query muito curta, retornando array vazio');
    return [];
  }

  try {
    const searchQuery = encodeURIComponent(query.trim());
    console.log('Buscando posts com query:', searchQuery);
    
    const url = `/api/posts/search?q=${searchQuery}`;
    console.log('URL da busca local:', url);
    
    const response = await fetch(url);
    console.log('Status da resposta:', response.status);
    
    if (!response.ok) {
      throw new Error(`Erro na busca: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Resultados da busca:', data?.length || 0, 'posts encontrados');
    
    if (!Array.isArray(data)) {
      console.error('Resposta da API não é um array:', data);
      return [];
    }
    
    return data.map(mapPost);
  } catch (err) {
    console.error("Erro em searchPosts:", err);
    return [];
  }
}

function mapPost(post: WordPressPost): IPost {
  return {
    id: post.id,
    title: post.title?.rendered ?? "",
    content: post.content?.rendered ?? "",
    excerpt: post.excerpt?.rendered ?? "",
    slug: post.slug,
    date: post.date,
    featuredImage: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? "/fallback.jpg",
    author: post._embedded?.author?.[0]?.name ?? "Desconhecido",
    categories: Array.isArray(post.categories) ? post.categories : [],
    modified: post.modified,
    comments: [],
  };
} 