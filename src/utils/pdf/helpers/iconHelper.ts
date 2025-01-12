import { jsPDF } from 'jspdf';
import { colors } from '../styles/colors';

interface IconOptions {
  size?: number;
  color?: number[];
}

const DEFAULT_SIZE = 10;

export async function drawIcon(
  doc: jsPDF, 
  iconName: string, 
  x: number, 
  y: number, 
  options: IconOptions = {}
): Promise<void> {
  const { size = DEFAULT_SIZE, color = colors.primary.main } = options;
  
  // Create canvas for icon
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Set up canvas
  canvas.width = size * 2; // Double size for better resolution
  canvas.height = size * 2;
  ctx.scale(2, 2);

  // Set icon color
  ctx.strokeStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
  ctx.fillStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
  ctx.lineWidth = 1.5;

  // Draw icon
  ctx.beginPath();
  drawIconPath(ctx, iconName, size);
  ctx.stroke();

  // Add to PDF
  try {
    const imageData = canvas.toDataURL('image/png');
    doc.addImage(imageData, 'PNG', x, y, size, size);
  } catch (error) {
    console.warn('Failed to add icon to PDF:', error);
  }
}

function drawIconPath(ctx: CanvasRenderingContext2D, iconName: string, size: number): void {
  const center = size / 2;
  const radius = size / 3;

  switch (iconName) {
    case 'sun':
      ctx.arc(center, center, radius, 0, Math.PI * 2);
      for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI) / 4;
        ctx.moveTo(
          center + Math.cos(angle) * radius,
          center + Math.sin(angle) * radius
        );
        ctx.lineTo(
          center + Math.cos(angle) * (radius * 1.5),
          center + Math.sin(angle) * (radius * 1.5)
        );
      }
      break;

    case 'zap':
      ctx.moveTo(center, 0);
      ctx.lineTo(0, center);
      ctx.lineTo(center, center);
      ctx.lineTo(0, size);
      ctx.lineTo(size, center);
      ctx.lineTo(center, center);
      break;

    case 'maximize':
      ctx.rect(2, 2, size - 4, size - 4);
      ctx.moveTo(2, center);
      ctx.lineTo(size - 2, center);
      ctx.moveTo(center, 2);
      ctx.lineTo(center, size - 2);
      break;

    case 'weight':
      ctx.arc(center, size / 3, radius / 2, 0, Math.PI * 2);
      ctx.moveTo(center - radius, size / 3);
      ctx.lineTo(0, size - 2);
      ctx.lineTo(size, size - 2);
      ctx.lineTo(center + radius, size / 3);
      break;

    case 'settings':
      ctx.arc(center, center, radius, 0, Math.PI * 2);
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3;
        ctx.moveTo(
          center + Math.cos(angle) * radius,
          center + Math.sin(angle) * radius
        );
        ctx.lineTo(
          center + Math.cos(angle) * (radius * 1.5),
          center + Math.sin(angle) * (radius * 1.5)
        );
      }
      break;
  }
}