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
  modified: string;
  comments?: any[];
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
  };
}
