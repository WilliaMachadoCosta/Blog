// src/services/postService.ts

import { IPost, WordPressPost } from "@/models/interfaces/post";

const API_BASE = "https://api.chamanozap.net/wp-json/wp/v2";

// Cache em memória para evitar requisições desnecessárias
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos em millisegundos

const fixDomain = (text: string): string =>
  typeof text === "string"
    ? text.replace(/https:\/\/admin\.chamanozap\.net/g, 'https://api.chamanozap.net')
    : text;


const fetchJson = async (url: string, useCache = true, retryCount = 0) => {
  const cacheKey = url;
  const maxRetries = 3;

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

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 segundos timeout

  try {
    const res = await fetch(url, {
      cache: "force-cache", // Usar cache do Next.js
      next: {
        revalidate: 86400 // Revalidar a cada 5 minutos
      },
      signal: controller.signal,
      headers: {
        'User-Agent': 'ChamaNoZap-Blog/1.0',
        'Accept': 'application/json',
        'Accept-Encoding': 'gzip, deflate, br'
      }
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      // Se for erro 5xx e ainda temos tentativas, tentar novamente
      if (res.status >= 500 && res.status < 600 && retryCount < maxRetries) {
        console.log(`Server error ${res.status}, retrying... (${retryCount + 1}/${maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1))); // Backoff exponencial
        return fetchJson(url, useCache, retryCount + 1);
      }

      throw new Error(`Erro ao buscar: ${url} - Status: ${res.status}`);
    }

    const data = await res.json();

    // Armazenar no cache em memória
    if (useCache) {
      cache.set(cacheKey, { data, timestamp: Date.now() });
    }

    return data;
  } catch (error) {
    clearTimeout(timeoutId);

    // Se for erro de rede e ainda temos tentativas, tentar novamente
    if (retryCount < maxRetries && (
      error instanceof Error && (
        error.name === 'AbortError' ||
        error.message.includes('fetch') ||
        error.message.includes('network')
      )
    )) {
      console.log(`Network error, retrying... (${retryCount + 1}/${maxRetries})`);
      await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1))); // Backoff exponencial
      return fetchJson(url, useCache, retryCount + 1);
    }

    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error(`Timeout ao buscar: ${url}`);
    }
    throw error;
  }
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



export async function getAllPostsExcetoNoticias(): Promise<IPost[]> {
  try {
    const [postsData, categoriesData] = await Promise.all([
      fetchJson(`${API_BASE}/posts?_embed&orderby=date&order=desc&per_page=20`),
      getCategories()
    ]);

    const categoriesMap = new Map<number, string>();
    categoriesData.forEach((cat: ICategory) => {
      categoriesMap.set(cat.id, cat.name);
    });

    // Mapeia os posts
    const mappedPosts = postsData.map((post: WordPressPost) => {
      const mapped = mapPost(post);
      return {
        ...mapped,
        categoryNames: mapped.categories.map(
          catId => categoriesMap.get(catId) ?? "Sem categoria"
        )
      };
    });

    // 🔎 Filtra fora os posts que tenham a categoria ID 1941 (Notícia)
    const filteredPosts = mappedPosts.filter((post: IPost) =>
      !post.categories.includes(1941)
    );


    return filteredPosts;
  } catch (err) {
    console.error("Erro em getAllPosts:", err);
    return [];
  }
}

export async function getAllPosts(): Promise<IPost[]> {
  try {
    const [postsData, categoriesData] = await Promise.all([
      fetchJson(`${API_BASE}/posts?_embed&orderby=date&order=desc&per_page=20`),
      getCategories()
    ]);

    const categoriesMap = new Map<number, string>();
    categoriesData.forEach((cat: ICategory) => {
      categoriesMap.set(cat.id, cat.name);
    });

    return postsData.map((post: WordPressPost) => {
      const mapped = mapPost(post);
      return {
        ...mapped,
        categoryNames: mapped.categories.map(catId => categoriesMap.get(catId) ?? "Sem categoria")
      };
    });
  } catch (err) {
    console.error("Erro em getAllPosts:", err);
    return [];
  }
}


export interface ICategory {
  id: number;
  name: string;
  slug: string;
}

export async function getCategories(): Promise<ICategory[]> {
  try {
    return await fetchJson(`${API_BASE}/categories?per_page=100`);
  } catch (err) {
    console.error("Erro em getCategories:", err);
    return [];
  }
}


export async function getAllForSitemap(): Promise<IPost[]> {
  try {
    const perPage = 50; // pode aumentar um pouco para reduzir requests
    let page = 1;
    let allPosts: IPost[] = [];
    let totalPages = 1;

    do {
      const res = await fetch(
        `${API_BASE}/posts?_embed&orderby=date&order=desc&per_page=${perPage}&page=${page}`,
        {
          next: { revalidate: 0 }, // 👈 nunca cachear
          cache: "no-store",
        }
      );

      if (!res.ok) {
        throw new Error(`Erro ao buscar posts: ${res.status}`);
      }

      const data = await res.json();

      // headers retornados pelo WP
      const totalPagesHeader = res.headers.get("X-WP-TotalPages");
      if (totalPagesHeader) {
        totalPages = parseInt(totalPagesHeader, 10);
      }

      allPosts = [...allPosts, ...data.map(mapPost)];
      page++;
    } while (page <= totalPages);

    return allPosts;
  } catch (err) {
    console.error("Erro em getAllForSitemap:", err);
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

// retorna posts + totalPages (WordPress envia no header X-WP-TotalPages)
export async function getPostsPaginatedByCategory(
  categoryId: number,
  page = 1,
  perPage = 10
): Promise<{ posts: IPost[]; totalPages: number; total: number }> {
  try {
    const url = `${API_BASE}/posts?categories=${categoryId}&_embed&orderby=date&order=desc&page=${page}&per_page=${perPage}`;
    const res = await fetch(url, { next: { revalidate: 86400 } });

    if (!res.ok) {
      console.error("[getPostsPaginatedByCategory] HTTP error", res.status);
      return { posts: [], totalPages: 1, total: 0 };
    }

    const data = await res.json();
    const totalPages = parseInt(res.headers.get("X-WP-TotalPages") ?? "1", 10);
    const total = parseInt(res.headers.get("X-WP-Total") ?? "0", 10);

    return {
      posts: Array.isArray(data) ? data.map(mapPost) : [],
      totalPages: isNaN(totalPages) ? 1 : totalPages,
      total: isNaN(total) ? 0 : total,
    };
  } catch (err) {
    console.error("[getPostsPaginatedByCategory] erro:", err);
    return { posts: [], totalPages: 1, total: 0 };
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

    // Usar API route local para evitar CORS
    const url = `/api/posts/search?q=${searchQuery}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Erro na busca: ${response.status}`);
    }

    const data = await response.json();

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
    content: fixDomain(post.content.rendered) ?? "",
    excerpt: fixDomain(post.excerpt.rendered) ?? "",
    slug: post.slug,
    date: post.date,
    featuredImage: fixDomain(post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? "/fallback.jpg"),
    author: post._embedded?.author?.[0]?.name ?? "William M.",
    categories: Array.isArray(post.categories) ? post.categories : [],
    categoryNames: post._embedded?.["wp:term"]?.[0]?.map((c: any) => c.name) ?? [],
    categorySlugs: post._embedded?.["wp:term"]?.[0]?.map((c: any) => c.slug) ?? [],
    modified: post.modified,
    comments: [],
  };
}


