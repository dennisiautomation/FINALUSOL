import { jsPDF } from 'jspdf';
import { Sun, Zap, Maximize, Weight, DollarSign, TrendingUp, Clock, PiggyBank } from 'lucide-react';

export function drawIcon(doc: jsPDF, icon: any, x: number, y: number, size: number = 5): void {
  const canvas = document.createElement('canvas');
  canvas.width = 24;
  canvas.height = 24;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Render icon to canvas
  const iconElement = icon.render();
  const svgString = new XMLSerializer().serializeToString(iconElement);
  const img = new Image();
  img.src = 'data:image/svg+xml;base64,' + btoa(svgString);
  
  img.onload = () => {
    ctx.drawImage(img, 0, 0, 24, 24);
    const imageData = canvas.toDataURL('image/png');
    doc.addImage(imageData, 'PNG', x, y, size, size);
  };
}

export const icons = {
  Sun,
  Zap,
  Maximize,
  Weight,
  DollarSign,
  TrendingUp,
  Clock,
  PiggyBank
};