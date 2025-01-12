import { jsPDF } from 'jspdf';
import { ProposalData } from '../../../types/proposal';
import { PDFSection } from './PDFSection';
import { formatCurrency, formatNumber } from '../../../utils/formatters';

export class ChartsSection implements PDFSection {
  constructor(private doc: jsPDF) {}

  public get estimatedHeight(): number {
    return 180;
  }

  public render(data: ProposalData, startY: number): number {
    // Section title
    this.doc.setTextColor(245, 158, 11);
    this.doc.setFontSize(16);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('Análise Comparativa', 20, startY);

    // Draw consumption comparison
    this.drawConsumptionComparison(data, startY + 30);

    // Draw savings projection
    this.drawSavingsProjection(data, startY + 110);

    return startY + this.estimatedHeight;
  }

  private drawConsumptionComparison(data: ProposalData, y: number) {
    const currentConsumption = data.customer.consumptionInfo.averageConsumption;
    const futureConsumption = currentConsumption * 0.1; // 90% reduction
    
    // Title
    this.doc.setFontSize(14);
    this.doc.setTextColor(0, 0, 0);
    this.doc.text('Comparativo de Consumo Mensal', 20, y);

    // Draw comparison boxes
    const boxWidth = 80;
    const boxHeight = 60;
    const spacing = 20;
    const startX = 30;

    // Current consumption box
    this.drawComparisonBox(
      startX, y + 15,
      boxWidth, boxHeight,
      'Consumo Atual',
      formatNumber(currentConsumption),
      'kWh/mês',
      '#f59e0b'
    );

    // Future consumption box
    this.drawComparisonBox(
      startX + boxWidth + spacing, y + 15,
      boxWidth, boxHeight,
      'Com Sistema Solar',
      formatNumber(futureConsumption),
      'kWh/mês',
      '#10b981'
    );

    // Add reduction percentage
    const reduction = ((currentConsumption - futureConsumption) / currentConsumption * 100).toFixed(0);
    this.doc.setFontSize(12);
    this.doc.setTextColor(0, 0, 0);
    this.doc.text(`Redução de ${reduction}% no consumo`, 20, y + boxHeight + 30);
  }

  private drawComparisonBox(x: number, y: number, width: number, height: number, title: string, value: string, unit: string, color: string) {
    // Box
    this.doc.setFillColor(250, 250, 250);
    this.doc.roundedRect(x, y, width, height, 3, 3, 'F');

    // Colored indicator
    this.doc.setFillColor(color);
    this.doc.rect(x, y, 5, height, 'F');

    // Text
    this.doc.setTextColor(100, 100, 100);
    this.doc.setFontSize(10);
    this.doc.text(title, x + 10, y + 15);

    this.doc.setTextColor(0, 0, 0);
    this.doc.setFontSize(16);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text(value, x + 10, y + 35);

    this.doc.setFontSize(10);
    this.doc.setFont('helvetica', 'normal');
    this.doc.text(unit, x + 10, y + 45);
  }

  private drawSavingsProjection(data: ProposalData, y: number) {
    // Title
    this.doc.setFontSize(14);
    this.doc.setTextColor(0, 0, 0);
    this.doc.text('Projeção de Economia', 20, y);

    // Calculate values
    const annualSavings = data.financial.annualSavings;
    const totalSavings = annualSavings * 25;

    // Draw info boxes
    const boxes = [
      {
        title: 'Economia Mensal',
        value: formatCurrency(data.financial.monthlySavings),
        color: '#10b981'
      },
      {
        title: 'Economia em 25 anos',
        value: formatCurrency(totalSavings),
        color: '#3b82f6'
      },
      {
        title: 'Tempo de Retorno',
        value: `${data.financial.estimatedPayback.toFixed(1)} anos`,
        color: '#8b5cf6'
      }
    ];

    const boxWidth = 80;
    const boxHeight = 40;
    const spacing = 10;
    let currentX = 20;

    boxes.forEach((box, index) => {
      this.drawInfoBox(
        currentX,
        y + 20,
        boxWidth,
        boxHeight,
        box.title,
        box.value,
        box.color
      );
      currentX += boxWidth + spacing;
    });
  }

  private drawInfoBox(x: number, y: number, width: number, height: number, title: string, value: string, color: string) {
    // Box with border
    this.doc.setDrawColor(230, 230, 230);
    this.doc.setFillColor(250, 250, 250);
    this.doc.roundedRect(x, y, width, height, 3, 3, 'FD');

    // Colored indicator
    this.doc.setFillColor(color);
    this.doc.rect(x, y, width, 3, 'F');

    // Text
    this.doc.setTextColor(100, 100, 100);
    this.doc.setFontSize(8);
    this.doc.text(title, x + 5, y + 15);

    this.doc.setTextColor(0, 0, 0);
    this.doc.setFontSize(10);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text(value, x + 5, y + 30);
  }
}