import { jsPDF } from 'jspdf';
import { ProposalData } from '../../../types/proposal';
import { colors } from '../styles/colors';
import { fonts } from '../styles/fonts';
import { getProductTypeLabel } from '../../productFormatters';

export async function drawEquipmentList(doc: jsPDF, data: ProposalData, startY: number): Promise<number> {
  let currentY = startY + 20;

  // Section title
  doc.setFillColor(...colors.primary.main);
  doc.setTextColor(...colors.text.primary);
  doc.setFontSize(fonts.sizes.h3);
  doc.text('Equipamentos do Sistema', 20, currentY);
  currentY += 30;

  // Table headers
  const headers = ['Equipamento', 'Fabricante', 'Modelo', 'Qtd', 'Garantia'];
  const colWidths = [40, 35, 45, 20, 30];
  let x = 20;

  // Header style
  doc.setFillColor(...colors.primary.light);
  doc.rect(20, currentY - 10, doc.internal.pageSize.width - 40, 20, 'F');
  
  doc.setFontSize(fonts.sizes.small);
  doc.setTextColor(...colors.text.primary);

  headers.forEach((header, i) => {
    doc.text(header, x, currentY);
    x += colWidths[i];
  });

  currentY += 20;

  // Table content
  doc.setFontSize(fonts.sizes.body);
  doc.setTextColor(...colors.text.secondary);

  data.products.forEach(({ product, quantity }) => {
    x = 20;
    
    // Alternate row background
    if ((currentY / 20) % 2 === 0) {
      doc.setFillColor(250, 250, 250);
      doc.rect(20, currentY - 10, doc.internal.pageSize.width - 40, 20, 'F');
    }
    
    doc.text(getProductTypeLabel(product.type), x, currentY);
    x += colWidths[0];
    
    doc.text(product.manufacturer, x, currentY);
    x += colWidths[1];
    
    doc.text(product.model, x, currentY);
    x += colWidths[2];
    
    doc.text(quantity.toString(), x, currentY);
    x += colWidths[3];
    
    doc.text(`${product.warranty} anos`, x, currentY);
    
    currentY += 20;
  });

  return currentY + 20;
}