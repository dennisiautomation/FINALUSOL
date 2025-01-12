import { jsPDF } from 'jspdf';
import { ProposalData } from '../../../types/proposal';
import { PDF_CONFIG } from '../constants';

export async function drawCustomerInfo(doc: jsPDF, data: ProposalData, startY: number): Promise<number> {
  let currentY = startY + PDF_CONFIG.spacing.margin;

  // Section title
  doc.setFontSize(PDF_CONFIG.font.size.subtitle);
  doc.setTextColor(...PDF_CONFIG.colors.primary);
  doc.text('Informações do Cliente', 20, currentY);
  currentY += 15;

  // Customer info in grid layout
  doc.setFontSize(PDF_CONFIG.font.size.normal);
  doc.setTextColor(...PDF_CONFIG.colors.text.dark);

  const info = [
    { label: 'Nome', value: data.customer.name },
    { label: 'Email', value: data.customer.email },
    { label: 'Telefone', value: data.customer.phone },
    { label: 'Documento', value: `${data.customer.documentType.toUpperCase()}: ${data.customer.document}` }
  ];

  info.forEach((item, index) => {
    const x = index % 2 === 0 ? 20 : 120;
    if (index % 2 === 0 && index > 0) currentY += 25;

    doc.setTextColor(...PDF_CONFIG.colors.text.medium);
    doc.text(item.label, x, currentY);
    
    doc.setTextColor(...PDF_CONFIG.colors.text.dark);
    doc.text(item.value, x, currentY + 8);
  });

  currentY += 25;

  // Address section
  doc.setTextColor(...PDF_CONFIG.colors.text.medium);
  doc.text('Endereço', 20, currentY);
  currentY += 8;

  doc.setTextColor(...PDF_CONFIG.colors.text.dark);
  const address = `${data.customer.address.street}, ${data.customer.address.number}`;
  const cityState = `${data.customer.address.city}/${data.customer.address.state} - CEP: ${data.customer.address.zipCode}`;
  
  doc.text(address, 20, currentY);
  doc.text(cityState, 20, currentY + 8);

  return currentY + 20;
}