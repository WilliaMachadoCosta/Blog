"use client";

import { useState } from "react";
import Link from "next/link";
import { IPost } from "@/models/interfaces/post";

type Props = {
    posts: IPost[];
};

export function Carrocel({ posts }: Props) {
    const [postIndex, setPostIndex] = useState(0);
    const postsPerView = 3;
    const totalPostPages = Math.ceil(posts.length / postsPerView);

    return (
        <div>
            {posts.length > 0 && (
                <div className="relative">
                    <h3 className="text-xl font-semibold mb-4 text-green-900">Posts em Destaque</h3>
                    <div className="flex overflow-hidden gap-4 px-10">
                        {posts
                            .slice(postIndex * postsPerView, (postIndex + 1) * postsPerView)
                            .map((post) => (
                                <Link
                                    href={`/post/${post.slug}`}
                                    key={post.id}
                                    className="bg-white rounded shadow p-4 min-w-[300px] flex-shrink-0 hover:shadow-lg transition-all"
                                >
                                    <img
                                        src={typeof post.featuredImage === "string" ? post.featuredImage : "/default.jpg"}
                                        alt={post.title ?? "Imagem do post"}
                                        className="w-full h-36 object-cover rounded mb-2"
                                    />
                                    <h4
                                        className="font-semibold text-green-900 mb-1 text-base"
                                        dangerouslySetInnerHTML={{ __html: post.title }}
                                    />
                                    <p
                                        className=" prose max-w-none text-gray-700 text-sm line-clamp-3"
                                        dangerouslySetInnerHTML={{ __html: post.excerpt }}
                                    />
                                </Link>
                            ))}
                    </div>

                    {/* Indicadores do carrossel */}
                    <div className="flex justify-center gap-2 mt-4">
                        {Array.from({ length: totalPostPages }).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setPostIndex(i)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${i === postIndex ? "bg-green-900 scale-110" : "bg-green-300"
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
