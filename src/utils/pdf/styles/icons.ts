import { jsPDF } from 'jspdf';

const ICON_SIZE = 10;

export async function drawIcon(doc: jsPDF, type: string, x: number, y: number, size: number = ICON_SIZE) {
  // Create canvas for icon drawing
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  canvas.width = size * 2;
  canvas.height = size * 2;
  ctx.scale(2, 2); // For better resolution

  // Draw icon paths
  ctx.beginPath();
  switch (type) {
    case 'sun':
      drawSunIcon(ctx, size);
      break;
    case 'zap':
      drawZapIcon(ctx, size);
      break;
    case 'chart':
      drawChartIcon(ctx, size);
      break;
    case 'dollar':
      drawDollarIcon(ctx, size);
      break;
  }

  // Convert to image and add to PDF
  const imageData = canvas.toDataURL('image/png');
  doc.addImage(imageData, 'PNG', x, y, size, size);
}

function drawSunIcon(ctx: CanvasRenderingContext2D, size: number) {
  ctx.arc(size/2, size/2, size/3, 0, Math.PI * 2);
  ctx.moveTo(size/2, 0);
  // Draw sun rays
  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI) / 4;
    const x1 = size/2 + Math.cos(angle) * (size/4);
    const y1 = size/2 + Math.sin(angle) * (size/4);
    const x2 = size/2 + Math.cos(angle) * (size/2);
    const y2 = size/2 + Math.sin(angle) * (size/2);
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
  }
  ctx.stroke();
}

function drawZapIcon(ctx: CanvasRenderingContext2D, size: number) {
  ctx.moveTo(size/2, 0);
  ctx.lineTo(0, size/2);
  ctx.lineTo(size/2, size/2);
  ctx.lineTo(0, size);
  ctx.lineTo(size, size/2);
  ctx.lineTo(size/2, size/2);
  ctx.closePath();
  ctx.fill();
}

function drawChartIcon(ctx: CanvasRenderingContext2D, size: number) {
  ctx.moveTo(0, size);
  ctx.lineTo(0, size/3);
  ctx.lineTo(size/3, size/2);
  ctx.lineTo(2*size/3, size/4);
  ctx.lineTo(size, size/3);
  ctx.stroke();
}

function drawDollarIcon(ctx: CanvasRenderingContext2D, size: number) {
  ctx.moveTo(size/2, 0);
  ctx.lineTo(size/2, size);
  ctx.moveTo(size/4, size/4);
  ctx.lineTo(3*size/4, size/4);
  ctx.moveTo(size/4, 3*size/4);
  ctx.lineTo(3*size/4, 3*size/4);
  ctx.stroke();
}