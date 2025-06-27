import companyPostsData from '@/db/seed/company-posts.json';

export interface ICompanyPost {
    id: string;
    companyName: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    coverImageUrl: string;
    published: boolean;
    createdAt: string;
    updatedAt: string;
    author: string;
    contactInfo: {
        whatsapp: string;
        phone: string;
        site: string;
    };
}

export async function getCompanyPost(companyName: string): Promise<ICompanyPost | null> {
    try {
        const post = companyPostsData.companyPosts.find(
            (post) => post.companyName === companyName
        );
        return post || null;
    } catch (error) {
        console.error('Erro ao buscar post da empresa:', error);
        return null;
    }
}

export async function getAllCompanyPosts(): Promise<ICompanyPost[]> {
    try {
        return companyPostsData.companyPosts.filter(post => post.published);
    } catch (error) {
        console.error('Erro ao buscar posts das empresas:', error);
        return [];
    }
} 