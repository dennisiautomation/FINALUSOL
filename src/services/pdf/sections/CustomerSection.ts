import { jsPDF } from 'jspdf';
import { ProposalData } from '../../../types/proposal';
import { PDFSection } from './PDFSection';
import { drawText } from '../../../utils/pdf/text';
import { colors } from '../../../utils/pdf/colors';

export class CustomerSection implements PDFSection {
  constructor(private doc: jsPDF) {}

  public get estimatedHeight(): number {
    return 100;
  }

  public render(data: ProposalData, startY: number): number {
    const { customer } = data;
    let currentY = startY;

    // Section title
    currentY = drawText(this.doc, 'Informações do Cliente', 20, currentY + 5, {
      fontSize: 16,
      fontStyle: 'bold',
      color: [245, 158, 11] // yellow-600
    });

    currentY += 15;

    // Customer info in two columns
    const leftColumn = [
      { label: 'Nome', value: customer.name },
      { label: 'Email', value: customer.email },
      { label: 'Telefone', value: customer.phone }
    ];

    const rightColumn = [
      { label: 'Documento', value: `${customer.documentType === 'cpf' ? 'CPF' : 'CNPJ'}: ${customer.document}` },
      { label: 'Endereço', value: `${customer.address.street}, ${customer.address.number}` },
      { label: 'Cidade/UF', value: `${customer.address.city}/${customer.address.state}` }
    ];

    // Draw columns
    [leftColumn, rightColumn].forEach((column, index) => {
      let columnY = currentY;
      const xPos = 20 + (index * 90);

      column.forEach(({ label, value }) => {
        // Label
        columnY = drawText(this.doc, label, xPos, columnY, {
          fontSize: 10,
          color: [107, 114, 128] // gray-500
        });

        // Value
        columnY = drawText(this.doc, value, xPos, columnY + 6, {
          fontSize: 12,
          color: [17, 24, 39] // gray-900
        });

        columnY += 20;
      });

      currentY = Math.max(currentY, columnY);
    });

    return currentY;
  }
}