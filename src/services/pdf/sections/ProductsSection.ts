import { jsPDF } from 'jspdf';
import { ProposalData } from '../../../types/proposal';
import { PDFSection } from './PDFSection';
import { formatCurrency } from '../../../utils/formatters';
import { getProductTypeLabel } from '../../../utils/productFormatters';

export class ProductsSection implements PDFSection {
  constructor(private doc: jsPDF) {}

  public get estimatedHeight(): number {
    return 100;
  }

  public render(data: ProposalData, startY: number): number {
    this.doc.setTextColor(0, 0, 0);
    this.doc.setFontSize(14);
    this.doc.text('Equipamentos do Sistema', 20, startY);

    // Table headers
    const headers = ['Equipamento', 'Fabricante', 'Modelo', 'Qtd', 'Garantia'];
    const colWidths = [40, 35, 45, 20, 30];
    
    let y = startY + 15;
    let x = 20;

    // Draw headers
    this.doc.setFontSize(10);
    this.doc.setFont("helvetica", "bold");
    headers.forEach((header, i) => {
      this.doc.text(header, x, y);
      x += colWidths[i];
    });

    // Draw content
    y += 10;
    this.doc.setFont("helvetica", "normal");
    data.products.forEach(({ product, quantity }) => {
      x = 20;
      
      this.doc.text(getProductTypeLabel(product.type), x, y);
      x += colWidths[0];
      
      this.doc.text(product.manufacturer, x, y);
      x += colWidths[1];
      
      this.doc.text(product.model, x, y);
      x += colWidths[2];
      
      this.doc.text(quantity.toString(), x, y);
      x += colWidths[3];
      
      this.doc.text(`${product.warranty} anos`, x, y);
      
      y += 8;
    });

    return y + 10;
  }
}