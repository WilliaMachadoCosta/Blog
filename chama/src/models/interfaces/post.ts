export interface IPost {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  date: string;
  featuredImage: string;
  author: string;
  categories: number[];
  categoryNames?: string[]; // ← nomes já prontos
  categorySlugs: string[];
  modified: string;
  comments?: any[];
}


export interface WordPressCategory {
  id: number;
  name: string;
  slug: string;
  taxonomy: string;
}

export interface WordPressPost {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  slug: string;
  date: string;
  modified: string;
  categories: number[];
  _embedded?: {
    author?: { name: string }[];
    "wp:featuredmedia"?: { source_url: string }[];
    "wp:term"?: WordPressCategory[][]; // 👈 adiciona isso
  };
}

