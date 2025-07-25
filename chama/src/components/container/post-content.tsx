'use client';

import parse, { domToReact, HTMLReactParserOptions } from "html-react-parser";
import { GenericButton } from "../buttons/genericButton";
import LazyYouTube from "../media/LazyYouTube";
import GoogleAd from "../banner/google-ads";
import { Phone } from "lucide-react";

interface PostContentProps {
    html: string;
}

export function PostContent({ html }: PostContentProps) {
    let adInserted = false;

    const options: HTMLReactParserOptions = {
        replace: (domNode: any) => {
            if (domNode.type !== "tag") return;

            // ✅ Insere o anúncio após o primeiro <p>
            if (!adInserted && domNode.name === "p") {
                adInserted = true;
                return (
                    <>
                        {domToReact(domNode.children, options)}
                        <div className="my-6 max-w-2xl mx-auto w-full h-[200px] rounded-lg relative">
                            <div className="flex justify-center">
                                <GoogleAd className="my-9" />
                            </div>
                        </div>
                    </>
                );
            }

            // ✅ Substitui <custom-button> por uma caixa com os botões estilizados
            if (domNode.name === "custom-button") {
                const label = domNode.attribs["data-label"] || "Botão";
                const href = domNode.attribs["data-href"] || "#";
                const variant = domNode.attribs["data-variant"] || "default";

                return (
                    <div className="w-full flex justify-center px-4 py-6 bg-gray-50">
                        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg px-6 py-8 text-center space-y-6">
                            <p className="text-gray-800 text-base sm:text-lg font-medium">

                            </p>

                            <div className="space-y-4">
                                <GenericButton label={label} href={href} variant={variant as any} />
                            </div>
                        </div>
                    </div>
                );
            }

            // ✅ Substitui iframes do YouTube por lazy load
            if (
                domNode.name === "iframe" &&
                domNode.attribs?.src?.includes("youtube.com/embed/")
            ) {
                const src = domNode.attribs.src;
                const match = src.match(/youtube.com\/embed\/([a-zA-Z0-9_-]+)/);
                const videoId = match ? match[1] : undefined;
                if (videoId) {
                    return (
                        <LazyYouTube
                            videoId={videoId}
                            title={domNode.attribs.title || "YouTube video"}
                        />
                    );
                }
            }
        },
    };

    const parsed = parse(html, options);

    return (
        <article className="prose prose-neutral max-w-none text-black overflow-hidden prose-sm sm:prose-base lg:prose-lg">
            <div className="break-words overflow-hidden max-w-full">{parsed}</div>
        </article>
    );
}
