import { jsPDF } from 'jspdf';
import { ProposalData } from '../../../types/proposal';
import { PDFSection } from './PDFSection';

export class FooterSection implements PDFSection {
  constructor(private doc: jsPDF) {}

  public get estimatedHeight(): number {
    return 40;
  }

  public render(data: ProposalData, startY: number): number {
    const pageHeight = this.doc.internal.pageSize.height;
    const footerY = pageHeight - 20;

    // Add terms
    this.doc.setFontSize(10);
    this.doc.setTextColor(100, 100, 100);
    
    const terms = [
      '• Proposta sujeita à análise técnica após vistoria',
      '• Valores podem sofrer alteração conforme condições do local',
      '• Homologação junto à concessionária incluída',
      '• Garantia e suporte técnico conforme especificado'
    ];

    let y = footerY - 40;
    terms.forEach(term => {
      this.doc.text(term, 20, y);
      y += 7;
    });

    // Add validity and copyright
    const validityDate = new Date(data.date.getTime() + (data.validityDays * 24 * 60 * 60 * 1000));
    
    this.doc.setFontSize(8);
    this.doc.text(
      `Proposta válida até ${validityDate.toLocaleDateString()}`,
      105,
      footerY - 10,
      { align: 'center' }
    );
    
    this.doc.text(
      '© U-sol Energia Solar - Todos os direitos reservados',
      105,
      footerY,
      { align: 'center' }
    );

    return footerY;
  }
}