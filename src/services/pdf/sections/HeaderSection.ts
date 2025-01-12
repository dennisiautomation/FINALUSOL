import { jsPDF } from 'jspdf';
import { ProposalData } from '../../../types/proposal';
import { PDFSection } from './PDFSection';
import { loadAndDrawImage } from '../../../utils/pdf/imageUtils';

export class HeaderSection implements PDFSection {
  constructor(private doc: jsPDF) {}

  public get estimatedHeight(): number {
    return 100;
  }

  public async render(data: ProposalData, startY: number): Promise<number> {
    // Background gradient
    const gradient = this.doc.setFillColor(245, 158, 11); // yellow-600
    this.doc.rect(0, 0, 210, this.estimatedHeight, 'F');

    try {
      // Add logo
      await loadAndDrawImage(
        this.doc,
        'https://usolenergiasolar.com.br/wp-content/uploads/2023/04/00.png',
        20,
        20,
        40,
        20
      );
    } catch (error) {
      console.error('Failed to load logo:', error);
    }

    // Title
    this.doc.setTextColor(255, 255, 255);
    this.doc.setFontSize(24);
    this.doc.text('Proposta Técnica e Comercial', 20, 60);
    
    this.doc.setFontSize(16);
    this.doc.text('Sistema de Energia Solar Fotovoltaica', 20, 70);

    // Customer name
    this.doc.setFontSize(14);
    this.doc.text('Preparado especialmente para:', 20, 85);
    this.doc.setFontSize(18);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text(data.customer.name, 20, 95);

    // Date and validity
    this.doc.setFontSize(10);
    this.doc.setFont('helvetica', 'normal');
    this.doc.text(`Data: ${data.date.toLocaleDateString()}`, 170, 20, { align: 'right' });
    this.doc.text(`Validade: ${data.validityDays} dias`, 170, 30, { align: 'right' });

    return startY + this.estimatedHeight;
  }
}