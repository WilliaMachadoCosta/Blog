import parse, { domToReact, Element } from "html-react-parser";
import { GenericButton } from "../buttons/genericButton";


interface PostContentProps {
    html: string;
}

export function PostContent({ html }: PostContentProps) {
    return (
        <article className="prose prose-neutral max-w-none text-black">
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
                            <div className="w-full flex justify-center my-4">
                                <GenericButton label={label} href={href} variant={variant} />
                            </div>
                        );
                    }
                },
            })}
        </article>
    );
}
