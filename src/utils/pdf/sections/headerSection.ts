import { jsPDF } from 'jspdf';
import { drawText } from '../text';
import { ProposalData } from '../../../types/proposal';
import { colors } from '../colors';

export function drawHeader(doc: jsPDF, data: ProposalData, startY: number): number {
  const pageWidth = doc.internal.pageSize.width;

  // Background with gradient
  const gradient = doc.setFillColor(245, 158, 11);
  doc.rect(0, 0, pageWidth, 80, 'F');

  // Add background image if available
  try {
    doc.addImage(
      'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d',
      'JPEG',
      0,
      0,
      pageWidth,
      80,
      undefined,
      'FAST',
      0
    );
  } catch (error) {
    console.warn('Could not load background image');
  }

  // Semi-transparent overlay
  doc.setFillColor(0, 0, 0, 0.5);
  doc.rect(0, 0, pageWidth, 80, 'F');

  // Company name and logo
  let currentY = 30;
  drawText(doc, 'U-sol Energia Solar', 20, currentY, {
    fontSize: 28,
    fontStyle: 'bold',
    color: [255, 255, 255]
  });

  currentY += 20;
  drawText(doc, 'Proposta Técnica e Comercial', 20, currentY, {
    fontSize: 18,
    color: [255, 255, 255]
  });

  // Date and proposal info
  drawText(doc, `Data: ${data.date.toLocaleDateString()}`, pageWidth - 20, 20, {
    fontSize: 10,
    color: [255, 255, 255],
    align: 'right'
  });

  drawText(doc, `Proposta #${Math.random().toString(36).substr(2, 6).toUpperCase()}`, pageWidth - 20, 30, {
    fontSize: 10,
    color: [255, 255, 255],
    align: 'right'
  });

  return 100; // Return next Y position
}