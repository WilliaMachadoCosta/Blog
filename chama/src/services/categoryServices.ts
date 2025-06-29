export interface ICategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  count: number;
}

// Categorias hardcoded para evitar problemas de SSR
const categoriesData: ICategory[] = [
  {
    id: 1,
    name: "Atendimento ao Cliente",
    slug: "atendimento-ao-cliente",
    description: "Artigos sobre atendimento ao cliente e suporte",
    count: 0
  },
  {
    id: 2,
    name: "Mensagens",
    slug: "mensagens",
    description: "Conteúdo sobre comunicação e mensagens",
    count: 0
  },
  {
    id: 3,
    name: "Saúde",
    slug: "saude",
    description: "Artigos relacionados à saúde e bem-estar",
    count: 0
  },
  {
    id: 4,
    name: "Serviços de Eletricidade",
    slug: "servicos-de-eletricidade",
    description: "Informações sobre serviços elétricos",
    count: 0
  },
  {
    id: 5,
    name: "Serviços de Saneamento",
    slug: "servicos-de-saneamento",
    description: "Conteúdo sobre saneamento básico",
    count: 0
  },
  {
    id: 6,
    name: "Transporte e Turismo",
    slug: "transporte-turismo",
    description: "Artigos sobre transporte e turismo",
    count: 0
  },
  {
    id: 7,
    name: "Tutoriais Digitais",
    slug: "tutoriais-digitais",
    description: "Guias e tutoriais sobre tecnologia",
    count: 0
  }
];

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