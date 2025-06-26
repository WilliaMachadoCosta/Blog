// src/services/postService.ts

import { IPost, WordPressPost } from "@/models/interfaces/post";

const API_BASE = "https://chamanozap.net/wp-json/wp/v2";

const fetchJson = async (url: string) => {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Erro ao buscar: ${url}`);
  }
  return res.json();
};

export async function getAllPosts(): Promise<IPost[]> {
  try {
    const data = await fetchJson(`${API_BASE}/posts?_embed&orderby=date&order=desc`);
    return data.map(mapPost);
  } catch (err) {
    console.error("Erro em getAllPosts:", err);
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
  };
}


