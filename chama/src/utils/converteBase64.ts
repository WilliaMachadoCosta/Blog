export async function urlToBase64(url: string): Promise<string> {
  console.log('Tentando carregar imagem de:', url);
  alert(url)
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
