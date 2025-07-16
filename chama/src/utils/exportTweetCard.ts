import html2canvas from 'html2canvas-pro';

function waitForImageLoad(img: HTMLImageElement): Promise<void> {
  return new Promise((resolve) => {
    if (img.complete) resolve();
    else img.onload = () => resolve();
  });
}

export async function exportCardImage(element: HTMLElement, filename = 'tweet-card.png') {
  const img = element.querySelector('img');
  if (img) {
    await waitForImageLoad(img as HTMLImageElement);
  }

  const canvas = await html2canvas(element, {
    useCORS: true,        // <- Habilita CORS
    allowTaint: false,    // <- Não permite imagens sem CORS
  });

  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL();
  link.click();
}
