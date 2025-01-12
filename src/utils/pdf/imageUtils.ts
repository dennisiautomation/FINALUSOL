import { jsPDF } from 'jspdf';

export async function loadAndDrawImage(
  doc: jsPDF,
  url: string,
  x: number,
  y: number,
  width: number,
  height: number
): Promise<void> {
  try {
    const img = await loadImage(url);
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get canvas context');

    ctx.drawImage(img, 0, 0);
    const imageData = canvas.toDataURL('image/png');
    doc.addImage(imageData, 'PNG', x, y, width, height);
  } catch (error) {
    console.error('Failed to load image:', error);
    // Add fallback text
    doc.setFontSize(16);
    doc.setTextColor(255, 255, 255);
    doc.text('U-sol Energia Solar', x, y + 10);
  }
}

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}