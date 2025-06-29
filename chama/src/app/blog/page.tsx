import { Suspense } from "react";
import { getAllPosts } from "@/services/postServices";
import { getAllCategories } from "@/services/categoryServices";
import { SpinLoader } from "@/components/SpinLoad/SpinLoader";
import BlogClient from "./BlogClient";

export default async function BlogPage() {
  return (
    <div className="min-h-screen bg-[#f5f3ef] py-4 px-2 sm:px-4">
      <div className="max-w-6xl mx-auto">
        <Suspense fallback={<SpinLoader />}>
          <BlogContent />
        </Suspense>
      </div>
    </div>
  );
}

async function BlogContent() {
  // Buscar posts e categorias
  const posts = await getAllPosts();
  const categories = getAllCategories(); // Agora é síncrono

  return <BlogClient initialPosts={posts} categories={categories} />;
} 