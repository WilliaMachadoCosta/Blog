export interface ICategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  count: number;
}

// Importar categorias do arquivo JSON
import categoriesConfig from '@/config/categories.json';

const categoriesData: ICategory[] = categoriesConfig.categories;

export function getAllCategories(): ICategory[] {
  return categoriesData;
}

export function getCategoryBySlug(slug: string): ICategory | null {
  const category = categoriesData.find(cat => cat.slug === slug);
  return category || null;
}

export function getCategoryById(id: number): ICategory | null {
  const category = categoriesData.find(cat => cat.id === id);
  return category || null;
} 