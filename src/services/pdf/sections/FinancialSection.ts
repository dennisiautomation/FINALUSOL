import { jsPDF } from 'jspdf';
import { ProposalData } from '../../../types/proposal';
import { PDFSection } from './PDFSection';
import { formatCurrency } from '../../../utils/formatters';

export class FinancialSection implements PDFSection {
  constructor(private doc: jsPDF) {}

  public get estimatedHeight(): number {
    return 120;
  }

  public render(data: ProposalData, startY: number): number {
    this.doc.setTextColor(0, 0, 0);
    this.doc.setFontSize(14);
    this.doc.text('Análise Financeira', 20, startY);

    const financials = [
      {
        title: 'Economia Mensal',
        value: formatCurrency(data.financial.monthlySavings)
      },
      {
        title: 'Economia Anual',
        value: formatCurrency(data.financial.annualSavings)
      },
      {
        title: 'Tempo de Retorno',
        value: `${data.financial.estimatedPayback.toFixed(1)} anos`
      },
      {
        title: 'Investimento Total',
        value: formatCurrency(data.financial.totalInvestment)
      }
    ];

    let y = startY + 15;
    financials.forEach(item => {
      this.doc.setFontSize(12);
      this.doc.setFont("helvetica", "bold");
      this.doc.text(item.title, 30, y);
      
      this.doc.setFontSize(12);
      this.doc.text(item.value, 120, y, { align: 'right' });
      
      y += 12;
    });

    return y + 15;
  }
}