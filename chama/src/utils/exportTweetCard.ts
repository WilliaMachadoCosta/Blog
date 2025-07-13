import { toPng } from 'html-to-image';

export async function exportCardImage() {
  const element = document.getElementById('tweet-card');

  if (!element) {
    console.error('Elemento tweet-card não encontrado!');
    return;
  }

  try {
    const dataUrl = await toPng(element, {
      cacheBust: true,
      pixelRatio: 2, // qualidade melhorada
    });

    const link = document.createElement('a');
    link.download = 'tweet-card.png';
    link.href = dataUrl;
    link.click();
  } catch (error) {
    console.error('Erro ao gerar imagem:', error);
  }
}
