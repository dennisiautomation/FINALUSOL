// Utility for handling image loading in PDFs
export async function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
    img.src = url;
  });
}

export async function addImageToPDF(doc: any, url: string, x: number, y: number, width: number, height: number): Promise<void> {
  try {
    const img = await loadImage(url);
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Failed to get canvas context');
    
    ctx.drawImage(img, 0, 0);
    const imageData = canvas.toDataURL('image/jpeg');
    doc.addImage(imageData, 'JPEG', x, y, width, height);
  } catch (error) {
    console.warn('Failed to add image to PDF:', error);
    // Continue without image
  }
}