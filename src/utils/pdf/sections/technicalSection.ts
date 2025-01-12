import { jsPDF } from 'jspdf';
import { ProposalData } from '../../../types/proposal';
import { colors } from '../styles/colors';
import { fonts } from '../styles/fonts';
import { drawIcon } from '../helpers/iconHelper';
import { formatNumber } from '../../formatters';

export async function drawTechnicalSpecs(doc: jsPDF, data: ProposalData, startY: number): Promise<number> {
  let currentY = startY + 20;

  // Section title with icon
  doc.setTextColor(...colors.text.primary);
  doc.setFontSize(fonts.sizes.h3);
  await drawIcon(doc, 'settings', 20, currentY - 5);
  doc.text('Especificações do Sistema', 45, currentY);
  currentY += 30;

  // Specs grid
  const specs = [
    {
      icon: 'sun',
      label: 'Potência Total',
      value: `${formatNumber(data.technical.totalPower)} kWp`,
      color: colors.primary.main
    },
    {
      icon: 'zap',
      label: 'Produção Mensal',
      value: `${formatNumber(data.technical.monthlyProduction)} kWh`,
      color: colors.success
    },
    {
      icon: 'maximize',
      label: 'Área Necessária',
      value: `${formatNumber(data.technical.requiredArea)} m²`,
      color: colors.secondary.main
    },
    {
      icon: 'weight',
      label: 'Peso no Telhado',
      value: `${formatNumber(data.technical.roofWeight)} kg`,
      color: colors.secondary.dark
    }
  ];

  // Draw specs in a grid
  const boxWidth = (doc.internal.pageSize.width - 60) / 2;
  const boxHeight = 60;
  
  for (let i = 0; i < specs.length; i++) {
    const spec = specs[i];
    const col = i % 2;
    const row = Math.floor(i / 2);
    
    const x = 20 + (col * (boxWidth + 20));
    const y = currentY + (row * (boxHeight + 10));

    // Box with shadow and border
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(x, y, boxWidth, boxHeight, 3, 3, 'F');
    doc.setDrawColor(...spec.color);
    doc.roundedRect(x, y, boxWidth, boxHeight, 3, 3, 'D');

    // Icon
    await drawIcon(doc, spec.icon, x + 10, y + 15, spec.color);

    // Label and value
    doc.setTextColor(...colors.text.secondary);
    doc.setFontSize(fonts.sizes.small);
    doc.text(spec.label, x + 40, y + 20);

    doc.setTextColor(...colors.text.primary);
    doc.setFontSize(fonts.sizes.h3);
    doc.text(spec.value, x + 40, y + 40);
  }

  return currentY + (boxHeight * 2) + 40;
}