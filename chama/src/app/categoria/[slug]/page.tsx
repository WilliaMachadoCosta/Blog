import CategoryPage from "./page/[page]/page";

export default async function CategorySlug({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    return <CategoryPage params={{ slug, page: "1" }} />;
}
