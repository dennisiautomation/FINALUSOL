export interface PDFGenerationOptions {
  margin: number;
  image: {
    type: string;
    quality: number;
  };
  html2canvas: {
    scale: number;
    useCORS: boolean;
    logging: boolean;
    allowTaint: boolean;
    imageTimeout: number;
    onclone: (doc: Document) => void;
  };
  jsPDF: {
    unit: string;
    format: string;
    orientation: string;
    compress: boolean;
    hotfixes: string[];
  };
}