import { jsPDF } from 'jspdf';
import { ProposalData } from '../../../types/proposal';
import { PDFSection } from './PDFSection';

export class BenefitsSection implements PDFSection {
  constructor(private doc: jsPDF) {}

  public get estimatedHeight(): number {
    return 100;
  }

  public render(data: ProposalData, startY: number): number {
    this.doc.setTextColor(0, 0, 0);
    this.doc.setFontSize(14);
    this.doc.text('Benefícios do Sistema', 20, startY);

    const benefits = [
      {
        title: 'Economia Significativa',
        description: 'Redução de até 95% na sua conta de energia elétrica'
      },
      {
        title: 'Energia Limpa',
        description: 'Geração de energia renovável e sustentável'
      },
      {
        title: 'Valorização do Imóvel',
        description: 'Aumento do valor patrimonial da sua propriedade'
      },
      {
        title: 'Garantia Estendida',
        description: 'Equipamentos com garantia de até 25 anos'
      }
    ];

    let y = startY + 15;
    benefits.forEach(benefit => {
      this.doc.setFontSize(12);
      this.doc.setFont("helvetica", "bold");
      this.doc.text(benefit.title, 30, y);
      
      this.doc.setFontSize(10);
      this.doc.setFont("helvetica", "normal");
      this.doc.text(benefit.description, 30, y + 5);
      
      y += 15;
    });

    return y + 10;
  }
}