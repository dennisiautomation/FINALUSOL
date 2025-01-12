import { jsPDF } from 'jspdf';
import { ProposalData } from '../../../types/proposal';
import { drawImage } from '../helpers/imageHelper';
import { PDF_COLORS } from '../constants';

export async function drawCoverPage(doc: jsPDF, data: ProposalData): Promise<void> {
  if (!doc || !data) {
    throw new Error('Invalid parameters for cover page');
  }

  try {
    // Draw solid color background first as base
    doc.setFillColor(PDF_COLORS.primary);
    doc.rect(0, 0, 210, 200, 'F');

    // Try to draw image on top
    await drawImage(doc, 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d', {
      x: 0,
      y: 0,
      width: 210,
      height: 200,
      fallbackColor: PDF_COLORS.primary
    });

    // Draw semi-transparent overlay
    doc.setFillColor(0, 0, 0);
    doc.setGlobalAlpha(0.4);
    doc.rect(0, 0, 210, 200, 'F');
    doc.setGlobalAlpha(1);

    // Draw white card at bottom
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(0, 160, 210, 137, 20, 20, 'F');

    // Draw content
    drawCoverContent(doc, data);
  } catch (error) {
    console.error('Error in cover page:', error);
    // Continue with basic layout even if image fails
    drawBasicCover(doc, data);
  }
}

function drawBasicCover(doc: jsPDF, data: ProposalData): void {
  // Solid color background
  doc.setFillColor(PDF_COLORS.primary);
  doc.rect(0, 0, 210, 297, 'F');
  
  // White content area
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(20, 40, 170, 217, 10, 10, 'F');
  
  drawCoverContent(doc, data);
}

function drawCoverContent(doc: jsPDF, data: ProposalData): void {
  // Title
  doc.setTextColor(PDF_COLORS.primary);
  doc.setFontSize(24);
  doc.text('PROPOSTA COMERCIAL', 105, 200, { align: 'center' });

  // Main text
  doc.setTextColor(PDF_COLORS.secondary);
  doc.setFontSize(36);
  doc.text('Energia', 105, 230, { align: 'center' });
  doc.setTextColor(PDF_COLORS.primary);
  doc.text('Solar', 105, 250, { align: 'center' });

  // Customer info
  doc.setTextColor(100, 100, 100);
  doc.setFontSize(14);
  doc.text('Preparado especialmente para:', 105, 280, { align: 'center' });
  doc.setTextColor(50, 50, 50);
  doc.setFontSize(20);
  doc.text(data.customer.name, 105, 290, { align: 'center' });

  // Date
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.text(new Date().toLocaleDateString(), 180, 20, { align: 'right' });
}