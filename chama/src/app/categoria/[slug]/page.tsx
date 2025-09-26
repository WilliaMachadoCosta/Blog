//chama\src\app\categoria\[slug]\page.tsx
// src/app/categoria/[slug]/page.tsx
import CategoryPage from "@/components/templates/categoryPage";

export default async function CategorySlug({ params }: any) {
    const { slug } = params;
    return <CategoryPage slug={slug} page="1" />;
}