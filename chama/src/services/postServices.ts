// src/services/postService.ts

import { IPost, WordPressPost } from "@/models/interfaces/post";

const API_BASE = "https://chamanozap.net/wp-json/wp/v2";

// Cache em memória para evitar requisições desnecessárias
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos em millisegundos

const fetchJson = async (url: string, useCache = true) => {
  const cacheKey = url;

  // Verificar cache se habilitado
  if (useCache && cache.has(cacheKey)) {
    const cached = cache.get(cacheKey)!;
    const now = Date.now();

    // Se o cache ainda é válido, retornar dados em cache
    if (now - cached.timestamp < CACHE_DURATION) {
      console.log(`Cache hit: ${url}`);
      return cached.data;
    } else {
      // Cache expirado, remover
      cache.delete(cacheKey);
    }
  }

  // Fazer requisição à API
  console.log(`Fetching from API: ${url}`);
  const res = await fetch(url, {
    cache: "force-cache", // Usar cache do Next.js
    next: {
      revalidate: 300 // Revalidar a cada 5 minutos
    }
  });

  if (!res.ok) {
    throw new Error(`Erro ao buscar: ${url}`);
  }

  const data = await res.json();

  // Armazenar no cache em memória
  if (useCache) {
    cache.set(cacheKey, { data, timestamp: Date.now() });
  }

  return data;
};

// Função para limpar cache expirado
const cleanupCache = () => {
  const now = Date.now();
  for (const [key, value] of cache.entries()) {
    if (now - value.timestamp > CACHE_DURATION) {
      cache.delete(key);
    }
  }
};

// Limpar cache a cada 10 minutos
setInterval(cleanupCache, 10 * 60 * 1000);

export async function getPostsByIds(ids: number[]): Promise<IPost[]> {
  if (!ids.length) return [];

  try {
    const includeParam = ids.join(",");
    const data = await fetchJson(`${API_BASE}/posts?include=${includeParam}&per_page=30&_embed`);
    const posts = data.map(mapPost);

    // Buscar comentários para cada post em paralelo (com cache)
    const commentsByPost = await Promise.all(
      posts.map((post: IPost) => getCommentsByPost(post.id))
    );

    // Atribuir os comentários aos respectivos posts
    posts.forEach((post: IPost, index: number) => {
      post.comments = commentsByPost[index];
    });

    return posts;
  } catch (err) {
    console.error("Erro em getPostsByIds:", err);
    return [];
  }
}

export async function getAllPosts(): Promise<IPost[]> {
  try {
    const data = await fetchJson(`${API_BASE}/posts?_embed&orderby=date&order=desc&per_page=15`);
    return data.map(mapPost);
  } catch (err) {
    console.error("Erro em getAllPosts:", err);
    return [];
  }
}

export async function getCompanyPosts(): Promise<IPost[]> {
  try {
    // Buscar posts da categoria "empresas" ou com tag específica
    const data = await fetchJson(`${API_BASE}/posts?categories=empresas&_embed&orderby=date&order=desc`);
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
    const data = await fetchJson(`${API_BASE}/posts?slug=${slug}&_embed`);
    return data.length ? mapPost(data[0]) : null;
  } catch (err) {
    console.error("Erro em getPostBySlug:", err);
    return null;
  }
}

export async function getPostById(id: number): Promise<IPost | null> {
  try {
    const data = await fetchJson(`${API_BASE}/posts/${id}?_embed`);
    return mapPost(data);
  } catch (err) {
    console.error("Erro em getPostById:", err);
    return null;
  }
}

export async function getPostsByCategory(categoryId: number): Promise<IPost[]> {
  try {
    const data = await fetchJson(`${API_BASE}/posts?categories=${categoryId}&_embed&orderby=date&order=desc`);
    return data.map(mapPost);
  } catch (err) {
    console.error("Erro em getPostsByCategory:", err);
    return [];
  }
}

export async function getPostsByCategorySlug(categorySlug: string): Promise<IPost[]> {
  try {
    // Primeiro, buscar a categoria pelo slug para obter o ID
    const categoryResponse = await fetchJson(`${API_BASE}/categories?slug=${categorySlug}`);

    if (!categoryResponse || categoryResponse.length === 0) {
      console.log(`Categoria não encontrada: ${categorySlug}`);
      return [];
    }

    const categoryId = categoryResponse[0].id;
    console.log(`Buscando posts para categoria ID: ${categoryId} (slug: ${categorySlug})`);

    // Agora buscar os posts usando o ID da categoria
    const data = await fetchJson(`${API_BASE}/posts?categories=${categoryId}&_embed&orderby=date&order=desc`);
    return data.map(mapPost);
  } catch (err) {
    console.error("Erro em getPostsByCategorySlug:", err);
    return [];
  }
}

export async function getPostsByAuthor(authorId: number): Promise<IPost[]> {
  try {
    const data = await fetchJson(`${API_BASE}/posts?author=${authorId}&_embed&orderby=date&order=desc`);
    return data.map(mapPost);
  } catch (err) {
    console.error("Erro em getPostsByAuthor:", err);
    return [];
  }
}

export async function getCommentsByPost(postId: number) {
  try {
    return await fetchJson(`${API_BASE}/comments?post=${postId}`);
  } catch (err) {
    console.error("Erro em getCommentsByPost:", err);
    return [];
  }
}

export async function searchPosts(query: string): Promise<IPost[]> {
  if (!query || query.trim().length < 4) {
    return [];
  }

  try {
    const searchQuery = encodeURIComponent(query.trim());
    const data = await fetchJson(`${API_BASE}/posts?search=${searchQuery}&_embed&orderby=relevance&order=desc&per_page=20`);
    return data.map(mapPost);
  } catch (err) {
    console.error("Erro em searchPosts:", err);
    return [];
  }
}

// Função para limpar cache manualmente (útil para desenvolvimento)
export function clearCache() {
  cache.clear();
  console.log("Cache limpo manualmente");
}

// Função para verificar status do cache
export function getCacheStatus() {
  const now = Date.now();
  const validEntries = Array.from(cache.entries()).filter(([_, value]) =>
    now - value.timestamp < CACHE_DURATION
  );

  return {
    totalEntries: cache.size,
    validEntries: validEntries.length,
    expiredEntries: cache.size - validEntries.length
  };
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


