'use client';
import parse, { Element } from "html-react-parser";
import { GenericButton } from "../buttons/genericButton";
import LazyYouTube from "../media/LazyYouTube";
import GoogleAd from "../banner/google-ads";

interface PostContentProps {
    html: string;
}

export function PostContent({ html }: PostContentProps) {
    return (
        <article className="prose prose-neutral max-w-none text-black overflow-hidden prose-sm sm:prose-base lg:prose-lg">
            <div className="break-words overflow-hidden">
                {parse(html, {
                    replace: (domNode) => {
                        if (
                            domNode instanceof Element &&
                            domNode.name === "custom-button"
                        ) {
                            const el = domNode as Element;
                            const label = el.attribs["data-label"] || "Botão";
                            const href = el.attribs["data-href"] || "#";
                            const variant = el.attribs["data-variant"] as
                                | "whatsapp"
                                | "sac"
                                | "central"
                                | "default"
                                | "ads";

                            // Verifica se é um anúncio
                            if (label === "ads" || variant === "ads") {
                                return (
                                    <div className="ad-in-content my-6 w-full flex justify-center px-2 sm:px-0">
                                        <GoogleAd />
                                    </div>
                                );
                            }

                            return (
                                <div className="w-full flex justify-center my-3 sm:my-4 px-2 sm:px-0">
                                    <GenericButton label={label} href={href} variant={variant} />
                                </div>
                            );
                        }
                        // Lazy load YouTube embeds
                        if (
                            domNode instanceof Element &&
                            domNode.name === "iframe" &&
                            domNode.attribs?.src?.includes("youtube.com/embed/")
                        ) {
                            const src = domNode.attribs.src;
                            const match = src.match(/youtube.com\/embed\/([a-zA-Z0-9_-]+)/);
                            const videoId = match ? match[1] : undefined;
                            if (videoId) {
                                return <LazyYouTube videoId={videoId} title={domNode.attribs.title || "YouTube video"} />;
                            }
                        }
                    },
                })}
            </div>
        </article>
    );
}
