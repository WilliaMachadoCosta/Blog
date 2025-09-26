// types (exemplo)
export interface ICategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  // ... outros campos que você usa
}
const API_BASE = "https://api.chamanozap.net/wp-json/wp/v2";
export async function getAllCategoryBySlug(slug: string): Promise<ICategory | null> {
  try {
    const url = `${API_BASE}/categories?slug=${encodeURIComponent(slug)}`;
    const res = await fetch(url, { next: { revalidate: 86400 } }); // ajusta cache se quiser
    if (!res.ok) {
      console.error("[getCategoryBySlug] HTTP error", res.status);
      return null;
    }

    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) {
      console.log(`[getCategoryBySlug] Categoria não encontrada: ${slug}`);
      return null;
    }

    return data[0] as ICategory;
  } catch (err) {
    console.error("[getCategoryBySlug] erro:", err);
    return null;
  }
}

export async function getAllCategories(): Promise<ICategory[]> {
  try {
    const url = `${API_BASE}/categories?per_page=100`; // aumenta se precisar de mais
    const res = await fetch(url, { next: { revalidate: 86400 } }); // cache de 1 dia
    if (!res.ok) {
      console.error("[getAllCategories] HTTP error", res.status);
      return [];
    }

    const data = await res.json();
    if (!Array.isArray(data)) {
      console.error("[getAllCategories] Resposta inválida");
      return [];
    }

    return data as ICategory[];
  } catch (err) {
    console.error("[getAllCategories] erro:", err);
    return [];
  }
}
