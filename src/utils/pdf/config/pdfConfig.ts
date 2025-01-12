import { PDFOptions } from '../types/PDFOptions';

export function setupPDFOptions(): PDFOptions {
  return {
    margin: [10, 10, 10, 10],
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      logging: false,
      allowTaint: true,
      imageTimeout: 15000,
      onclone: (clonedDoc: Document) => {
        const elements = clonedDoc.getElementsByClassName('bg-image');
        Array.from(elements).forEach(el => {
          const style = window.getComputedStyle(el);
          (el as HTMLElement).style.backgroundImage = style.backgroundImage;
        });
      }
    },
    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait',
      compress: true,
      hotfixes: ['px_scaling']
    }
  };
}