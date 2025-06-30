import parse, { Element } from "html-react-parser";
import { GenericButton } from "../buttons/genericButton";
import GoogleAdSense from "@/components/banner/GoogleAdSense";
import { getAdConfig, shouldShowAds } from "@/config/ads";

interface PostContentProps {
    html: string;
}

export function PostContent({ html }: PostContentProps) {
    const showAds = shouldShowAds();
    
    // Função para inserir anúncios estrategicamente no conteúdo
    const insertAdsInContent = (html: string) => {
        if (!showAds) return html;
        
        // Divide o conteúdo em parágrafos
        const paragraphs = html.split('</p>');
        
        // Se há poucos parágrafos, não insere anúncios
        if (paragraphs.length < 4) return html;
        
        // Calcula onde inserir os anúncios (após 1/3 e 2/3 do conteúdo)
        const firstAdPosition = Math.floor(paragraphs.length * 0.33);
        const secondAdPosition = Math.floor(paragraphs.length * 0.66);
        
        let adCount = 0;
        const maxAds = 2; // Máximo de 2 anúncios por artigo
        
        const modifiedParagraphs = paragraphs.map((paragraph, index) => {
            let result = paragraph;
            
            // Insere anúncio após o primeiro terço do conteúdo
            if (index === firstAdPosition && adCount < maxAds) {
                result += `
                    </p>
                    <div class="ad-in-content my-6 p-4 bg-gray-50 rounded-lg border-l-4 border-green-500">
                        <div class="text-center text-sm text-gray-600 mb-2">📢 Publicidade</div>
                        <div class="ad-placeholder" data-ad-position="first"></div>
                    </div>
                    <p>
                `;
                adCount++;
            }
            
            // Insere anúncio após o segundo terço do conteúdo
            if (index === secondAdPosition && adCount < maxAds) {
                result += `
                    </p>
                    <div class="ad-in-content my-6 p-4 bg-gray-50 rounded-lg border-l-4 border-green-500">
                        <div class="text-center text-sm text-gray-600 mb-2">📢 Publicidade</div>
                        <div class="ad-placeholder" data-ad-position="second"></div>
                    </div>
                    <p>
                `;
                adCount++;
            }
            
            return result;
        });
        
        return modifiedParagraphs.join('');
    };

    const processedHtml = insertAdsInContent(html);

    return (
        <article className="prose prose-neutral max-w-none text-black overflow-hidden prose-sm sm:prose-base lg:prose-lg">
            <div className="break-words overflow-hidden">
                {parse(processedHtml, {
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
                        
                        // Renderiza anúncios nos placeholders
                        if (
                            domNode instanceof Element &&
                            domNode.name === "div" &&
                            domNode.attribs.class?.includes("ad-placeholder")
                        ) {
                            const position = domNode.attribs["data-ad-position"];
                            
                            return (
                                <div className="ad-in-content-wrapper">
                                    <GoogleAdSense 
                                        {...getAdConfig('BETWEEN_POSTS')}
                                        className="w-full max-w-full"
                                        isInContent={true}
                                    />
                                </div>
                            );
                        }
                    },
                })}
            </div>
        </article>
    );
}
