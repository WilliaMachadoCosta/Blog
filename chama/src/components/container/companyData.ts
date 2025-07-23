import parse, { Element } from "html-react-parser";

export function extractCompanyData(html: string) {
    let companyInfo: {
        nome?: string;
        logo?: string;
        whatsapp?: string;
        telefone?: string;
        site?: string;
    } = {};

    parse(html, {
        replace: (domNode) => {
            if (domNode instanceof Element) {
                const el = domNode as Element;

                if (el.name === "custom-empresa") {
                    companyInfo.nome = el.attribs["data-nome"] || undefined;
                    companyInfo.logo = el.attribs["data-logo"] || undefined;
                }

                if (el.name === "custom-button") {
                    const variant = el.attribs["data-variant"];
                    const href = el.attribs["data-href"];

                    if (variant === "whatsapp") {
                        const match = href.match(/phone=(\d+)/);
                        if (match) {
                            companyInfo.whatsapp = match[1];
                        }
                    }

                    if (variant === "sac") {
                        const match = href.match(/tel:(.+)/);
                        if (match) {
                            companyInfo.telefone = match[1];
                        }
                    }


                    if (variant === "site") {
                        companyInfo.site = href;
                    }
                }
            }
        },
    });

    return companyInfo;
}
