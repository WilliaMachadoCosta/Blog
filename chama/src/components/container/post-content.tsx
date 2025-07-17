'use client';

import parse, { domToReact, HTMLReactParserOptions } from "html-react-parser";
import { GenericButton } from "../buttons/genericButton";
import LazyYouTube from "../media/LazyYouTube";
import GoogleAd from "../banner/google-ads";
import AdContainer from "../banner/ad-container";

interface PostContentProps {
    html: string;
}

export function PostContent({ html }: PostContentProps) {
    let adInserted = false;

    const options: HTMLReactParserOptions = {
        replace: (domNode: any) => {
            if (domNode.type !== "tag") return;

            // ✅ Sempre insere o anúncio após o primeiro <p>
            if (!adInserted && domNode.name === "p") {
                adInserted = true;
                return (
                    <>
                        {domToReact(domNode.children, options)}
                        <GoogleAd className="my-9" />
                    </>
                );
            }

            // 🎯 Substituir custom-button manualmente (ainda funciona, mas não é obrigatório)
            if (domNode.name === "custom-button") {
                const label = domNode.attribs["data-label"] || "Botão";
                const href = domNode.attribs["data-href"] || "#";
                const variant = domNode.attribs["data-variant"] || "default";

                return (
                    <div className="w-full flex justify-center my-3 sm:my-4 px-2 sm:px-0">
                        <GenericButton label={label} href={href} variant={variant as any} />
                    </div>
                );
            }

            // 🔁 Substituição de iframe do YouTube por componente com lazy load
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
