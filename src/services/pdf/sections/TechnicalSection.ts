import { jsPDF } from 'jspdf';
import { ProposalData } from '../../../types/proposal';
import { PDFSection } from './PDFSection';
import { formatNumber } from '../../../utils/formatters';
import { drawIcon } from '../../../utils/pdf/iconUtils';

export class TechnicalSection implements PDFSection {
  constructor(private doc: jsPDF) {}

  public get estimatedHeight(): number {
    return 120;
  }

  public render(data: ProposalData, startY: number): number {
    // Section title
    this.doc.setTextColor(245, 158, 11); // yellow-600
    this.doc.setFontSize(16);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('Especificações Técnicas do Sistema', 20, startY);

    // Info boxes
    const specs = [
      { 
        icon: 'Sun',
        label: 'Potência Total',
        value: `${formatNumber(data.technical.totalPower)} kWp`,
        color: '#f59e0b' // yellow-600
      },
      {
        icon: 'Zap',
        label: 'Produção Mensal',
        value: `${formatNumber(data.technical.monthlyProduction)} kWh`,
        color: '#10b981' // green-500
      },
      {
        icon: 'Maximize',
        label: 'Área Necessária',
        value: `${formatNumber(data.technical.requiredArea)} m²`,
        color: '#3b82f6' // blue-500
      },
      {
        icon: 'Weight',
        label: 'Peso no Telhado',
        value: `${formatNumber(data.technical.roofWeight)} kg`,
        color: '#8b5cf6' // purple-500
      }
    ];

    const boxWidth = 80;
    const boxHeight = 50;
    const margin = 10;
    let currentX = 20;
    const y = startY + 20;

    specs.forEach((spec, index) => {
      // Box background
      this.doc.setFillColor(250, 250, 250);
      this.doc.roundedRect(currentX, y, boxWidth, boxHeight, 3, 3, 'F');

      // Draw icon
      drawIcon(this.doc, spec.icon, currentX + 5, y + 5, 8);

      // Text
      this.doc.setTextColor(100, 100, 100);
      this.doc.setFontSize(10);
      this.doc.text(spec.label, currentX + 5, y + 25);

      this.doc.setTextColor(0, 0, 0);
      this.doc.setFontSize(12);
      this.doc.setFont('helvetica', 'bold');
      this.doc.text(spec.value, currentX + 5, y + 40);

      currentX += boxWidth + margin;
    });

    return y + boxHeight + 20;
  }
}