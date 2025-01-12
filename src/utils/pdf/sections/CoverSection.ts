import { jsPDF } from 'jspdf';
import { ProposalData } from '../../../types/proposal';
import { PDFSection } from '../types';
import { ImageLoader } from '../helpers/ImageLoader';
import { PDF_CONFIG } from '../constants';

export class CoverSection implements PDFSection {
  private imageLoader: ImageLoader;

  constructor() {
    this.imageLoader = new ImageLoader();
  }

  public async draw(doc: jsPDF, data: ProposalData): Promise<void> {
    try {
      // Add logo
      await this.imageLoader.addImage(doc, 'https://usolenergiasolar.com.br/wp-content/uploads/2023/04/00.png', {
        x: 20,
        y: 20,
        width: 60,
        height: 60
      });

      // Add date in top right
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(data.date.toLocaleDateString(), 190, 30, { align: 'right' });

      // Main title
      doc.setFontSize(24);
      doc.setTextColor(0, 166, 81); // Green color
      doc.text('PROPOSTA COMERCIAL', 105, 120, { align: 'center' });

      // Energia Solar text
      doc.setFontSize(36);
      doc.text('Energia', 105, 150, { align: 'center' });
      doc.setTextColor(59, 130, 180); // Blue color
      doc.text('Solar', 105, 180, { align: 'center' });

      // Customer section at bottom
      doc.setFontSize(14);
      doc.setTextColor(100, 100, 100);
      doc.text('Preparado especialmente para:', 105, 240, { align: 'center' });
      doc.setFontSize(20);
      doc.setTextColor(50, 50, 50);
      doc.text(data.customer.name, 105, 260, { align: 'center' });

    } catch (error) {
      console.error('Error in cover section:', error);
      this.drawFallbackCover(doc, data);
    }
  }

  private drawFallbackCover(doc: jsPDF, data: ProposalData): void {
    // Simplified fallback cover if image loading fails
    doc.setFontSize(24);
    doc.setTextColor(0, 0, 0);
    doc.text('Proposta Comercial', 105, 100, { align: 'center' });
    doc.text(data.customer.name, 105, 150, { align: 'center' });
  }
}