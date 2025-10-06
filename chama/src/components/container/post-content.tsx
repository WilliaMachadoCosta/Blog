'use client';

import parse, { domToReact, HTMLReactParserOptions } from "html-react-parser";
import { GenericButton } from "../buttons/genericButton";
import LazyYouTube from "../media/LazyYouTube";
import GoogleAd from "../banner/google-ads";
import GoogleAdsense from "../banner/googleAdsense";

interface PostContentProps {
    html: string;
}

export function PostContent({ html }: PostContentProps) {
    let paragraphCount = 0; // contador de <p>

    const options: HTMLReactParserOptions = {
        replace: (domNode: any) => {
            if (domNode.type !== "tag") return;

            // ✅ Insere anúncio a cada 2 parágrafos
            if (domNode.name === "p") {
                paragraphCount++;
                if (paragraphCount % 4 === 0) {
                    return (
                        <>
                            {domToReact(domNode.children, options)}
                            {/* <div className="my-6 max-w-2xl mx-auto w-full rounded-lg relative z-50 min-h-[300px]"> */}
                            <div className="my-8 max-w-3xl mx-auto w-full rounded-lg bg-white flex justify-center items-start min-h-[250px]">
                                <GoogleAdsense
                                    slot="9825364292"
                                    className="w-full h-auto"
                                    format="rectangle"
                                />
                            </div>


                        </>
                    );
                }
            }

            // ✅ Substitui <custom-button>
            if (domNode.name === "custom-button") {
                const label = domNode.attribs["data-label"] || "Botão";
                const href = domNode.attribs["data-href"] || "#";
                const variant = domNode.attribs["data-variant"] || "default";

                return (
                    <div className="w-full px-4 py-6 flex flex-col items-center gap-4 text-center">
                        <div className="flex flex-col w-full max-w-lg mx-auto gap-4">
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
