export interface IPost {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  date: string;
  featuredImage: string;
  author?: string;
  categories?: number[];
}
