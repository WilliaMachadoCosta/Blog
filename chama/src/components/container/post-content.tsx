import parse, { Element } from "html-react-parser";
import { GenericButton } from "../buttons/genericButton";

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
                                | "default";

                            return (
                                <div className="w-full flex justify-center my-3 sm:my-4 px-2 sm:px-0">
                                    <GenericButton label={label} href={href} variant={variant} />
                                </div>
                            );
                        }
                    },
                })}
            </div>
        </article>
    );
}
