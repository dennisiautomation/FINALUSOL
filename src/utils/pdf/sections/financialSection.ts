import { jsPDF } from 'jspdf';
import { ProposalData } from '../../../types/proposal';
import { colors } from '../styles/colors';
import { fonts } from '../styles/fonts';
import { drawIcon } from '../styles/icons';
import { formatCurrency } from '../../formatters';

export async function drawFinancialAnalysis(doc: jsPDF, data: ProposalData, startY: number): Promise<number> {
  const pageWidth = doc.internal.pageSize.width;
  let currentY = startY + 20;

  // Section title
  doc.setFillColor(...colors.primary.main);
  doc.setTextColor(...colors.text.primary);
  doc.setFontSize(fonts.sizes.h3);
  doc.text('Análise Financeira', 20, currentY);
  currentY += 30;

  // Financial metrics grid
  const metrics = [
    {
      icon: 'dollar',
      label: 'Economia Mensal',
      value: formatCurrency(data.financial.monthlySavings),
      color: colors.success
    },
    {
      icon: 'chart',
      label: 'Economia Anual',
      value: formatCurrency(data.financial.annualSavings),
      color: colors.primary.main
    },
    {
      icon: 'clock',
      label: 'Tempo de Retorno',
      value: `${data.financial.estimatedPayback.toFixed(1)} anos`,
      color: colors.secondary.main
    }
  ];

  const boxWidth = (pageWidth - 60) / 2;
  const boxHeight = 80;
  let row = 0;
  let col = 0;

  for (const metric of metrics) {
    const x = 20 + (col * (boxWidth + 20));
    const y = currentY + (row * (boxHeight + 20));

    // Box with shadow effect
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(x, y, boxWidth, boxHeight, 3, 3, 'F');
    doc.setDrawColor(...metric.color);
    doc.roundedRect(x, y, boxWidth, boxHeight, 3, 3, 'D');

    // Icon
    await drawIcon(doc, metric.icon, x + 10, y + 20);

    // Label
    doc.setFontSize(fonts.sizes.small);
    doc.setTextColor(...colors.text.secondary);
    doc.text(metric.label, x + 30, y + 25);

    // Value
    doc.setFontSize(fonts.sizes.h3);
    doc.setTextColor(...colors.text.primary);
    doc.text(metric.value, x + 30, y + 50);

    col++;
    if (col >= 2) {
      col = 0;
      row++;
      currentY += boxHeight + 20;
    }
  }

  return currentY + 40;
}