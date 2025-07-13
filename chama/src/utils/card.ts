import html2canvas from 'html2canvas';

export const exportCardImage = async () => {
  const element = document.getElementById('tweet-card');
  if (!element) return;

  const canvas = await html2canvas(element);
  const dataUrl = canvas.toDataURL('image/png');

  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = 'post.png';
  link.click();
};
