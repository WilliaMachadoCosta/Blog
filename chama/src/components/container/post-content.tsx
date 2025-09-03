'use client';

import parse, { domToReact, HTMLReactParserOptions } from "html-react-parser";
import { GenericButton } from "../buttons/genericButton";
import LazyYouTube from "../media/LazyYouTube";
import GoogleAd from "../banner/google-ads";
import ScrollIndicator from "../buttons/scrollIndicador";

interface PostContentProps {
    html: string;
}

export function PostContent({ html }: PostContentProps) {
    let adInserted = false;

    const options: HTMLReactParserOptions = {
        replace: (domNode: any) => {
            if (domNode.type !== "tag") return;

            // ✅ Insere anúncio após o primeiro <p>
            if (!adInserted && domNode.name === "p") {
                adInserted = true;
                return (
                    <>
                        {domToReact(domNode.children, options)}
                        <div className="my-6 max-w-2xl mx-auto w-full h-[200px] rounded-lg relative">
                            <div className="flex justify-center">
                                <GoogleAd className="my-9" />
                            </div>
                            <div className="flex items-center gap-2 mt-6 text-gray-700 animate-bounce">
                                <ScrollIndicator />
                            </div>
                        </div>
                    </>
                );
            }

            // ✅ Substitui <custom-button> por layout limpo com botões alinhados
            if (domNode.name === "custom-button") {
                const label = domNode.attribs["data-label"] || "Botão";
                const href = domNode.attribs["data-href"] || "#";
                const variant = domNode.attribs["data-variant"] || "default";

                return (
                    <div className="w-full px-4 py-6 flex flex-col items-center gap-4 text-center">

                        <div className="flex flex-wrap justify-center gap-3">
                            <GenericButton label={label} href={href} variant={variant as any} />
                        </div>
                    </div>
                );
            }

            // ✅ Substitui iframe por LazyYouTube
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
