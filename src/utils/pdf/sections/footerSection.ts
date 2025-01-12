import { jsPDF } from 'jspdf';
import { drawText } from '../text';
import { ProposalData } from '../../../types/proposal';

export function drawFooter(doc: jsPDF, data: ProposalData, startY: number): number {
  const pageWidth = doc.internal.pageSize.width;
  let currentY = startY - 30;

  // Validity
  const validityDate = new Date(data.date.getTime() + (data.validityDays * 24 * 60 * 60 * 1000));
  drawText(doc, `Proposta válida até ${validityDate.toLocaleDateString()}`, pageWidth / 2, currentY, {
    fontSize: 8,
    color: [100, 100, 100],
    align: 'center'
  });

  currentY += 10;

  // Copyright
  drawText(doc, `© ${new Date().getFullYear()} U-sol Energia Solar - Todos os direitos reservados`, pageWidth / 2, currentY, {
    fontSize: 8,
    color: [100, 100, 100],
    align: 'center'
  });

  return currentY;
}