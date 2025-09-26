
//chama\src\app\categoria\[slug]\page\[page]\page.tsx
// src/app/categoria/[slug]/[page]/page.tsx
import CategoryPage from "@/components/templates/categoryPage";

export default function CategoryPageRoute({ params }: any) {
    const { slug, page } = params;
    return <CategoryPage slug={slug} page={page} />;
}
