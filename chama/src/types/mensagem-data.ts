export interface MensagemData {
  titulo: string;
  descricao: string;
  mensagens: string[];
  imagens: string[];
  coresFundo?: string[];
  seo: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
    ogImage: string;
    url: string;
  };
  infoSection?: {
    titulo: string;
    paragrafos: string[];
  };
  dicas?: {
    titulo: string;
    lista: string[];
  };
  frasesOcasiao?: {
    titulo: string;
    paragrafos: string[];
  };
}
