import parse, { Element } from "html-react-parser";

export function extractCompanyData(html: string) {
    let companyInfo: { nome?: string; logo?: string } = {};

    parse(html, {
        replace: (domNode) => {
            if (
                domNode instanceof Element &&
                domNode.name === "custom-empresa"
            ) {
                const el = domNode as Element;
                companyInfo = {
                    nome: el.attribs["data-nome"] || undefined,
                    logo: el.attribs["data-logo"] || undefined,
                };
            }
        },
    });

    return companyInfo;
}
