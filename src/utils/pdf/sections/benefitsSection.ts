import { jsPDF } from 'jspdf';
import { ProposalData } from '../../../types/proposal';
import { PDF_CONFIG } from '../constants';

export async function drawBenefits(doc: jsPDF, data: ProposalData, startY: number): Promise<number> {
  let currentY = startY + PDF_CONFIG.spacing.margin;

  // Section title
  doc.setFontSize(PDF_CONFIG.font.size.subtitle);
  doc.setTextColor(...PDF_CONFIG.colors.primary);
  doc.text('Benefícios do Sistema', 20, currentY);
  currentY += 20;

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

  benefits.forEach((benefit, index) => {
    if (index > 0) currentY += 25;

    doc.setFontSize(PDF_CONFIG.font.size.normal);
    doc.setTextColor(...PDF_CONFIG.colors.text.dark);
    doc.text(benefit.title, 20, currentY);

    doc.setFontSize(PDF_CONFIG.font.size.small);
    doc.setTextColor(...PDF_CONFIG.colors.text.medium);
    doc.text(benefit.description, 20, currentY + 8);
  });

  return currentY + 30;
}