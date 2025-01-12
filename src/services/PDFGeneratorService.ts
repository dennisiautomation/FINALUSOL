import { jsPDF } from 'jspdf';
import { ProposalData } from '../types/proposal';
import { formatCurrency } from '../utils/formatters';

export class PDFGeneratorService {
  private doc: jsPDF;
  private currentY: number = 0;
  private pageHeight: number;
  private marginLeft: number = 20;
  private marginRight: number = 20;
  private pageWidth: number = 210; // A4 width in mm

  constructor() {
    this.doc = new jsPDF();
    this.pageHeight = this.doc.internal.pageSize.height;
    this.setupFonts();
  }

  private setupFonts() {
    this.doc.setFont("helvetica");
  }

  private addNewPage() {
    this.doc.addPage();
    this.currentY = 20;
  }

  private checkPageBreak(height: number) {
    if (this.currentY + height > this.pageHeight - 20) {
      this.addNewPage();
      return true;
    }
    return false;
  }

  private addHeader(data: ProposalData) {
    // Background
    this.doc.setFillColor(245, 158, 11); // yellow-600
    this.doc.rect(0, 0, this.pageWidth, 60, 'F');

    // Logo and company name
    this.doc.setTextColor(255, 255, 255);
    this.doc.setFontSize(24);
    this.doc.text('U-sol Energia Solar', this.marginLeft, 30);

    // Date and proposal number
    this.doc.setFontSize(10);
    this.doc.text(`Data: ${data.date.toLocaleDateString()}`, this.pageWidth - this.marginRight - 40, 20, { align: 'right' });
    this.doc.text(`Validade: ${data.validityDays} dias`, this.pageWidth - this.marginRight - 40, 30, { align: 'right' });

    this.currentY = 80;
  }

  private addCustomerInfo(data: ProposalData) {
    this.doc.setTextColor(0, 0, 0);
    this.doc.setFontSize(14);
    this.doc.text('Dados do Cliente', this.marginLeft, this.currentY);
    
    this.currentY += 10;
    this.doc.setFontSize(12);
    
    const customer = data.customer;
    const customerInfo = [
      `Nome: ${customer.name}`,
      `Email: ${customer.email}`,
      `Telefone: ${customer.phone}`,
      `Endereço: ${customer.address.street}, ${customer.address.number}`,
      `${customer.address.city}/${customer.address.state} - CEP: ${customer.address.zipCode}`
    ];

    customerInfo.forEach(line => {
      this.doc.text(line, this.marginLeft, this.currentY);
      this.currentY += 7;
    });

    this.currentY += 10;
  }

  private addProductsTable(data: ProposalData) {
    this.checkPageBreak(60);

    this.doc.setFontSize(14);
    this.doc.text('Produtos e Serviços', this.marginLeft, this.currentY);
    this.currentY += 10;

    // Table headers
    const headers = ['Produto', 'Qtd', 'Valor Unit.', 'Total'];
    const colWidths = [80, 20, 30, 30];
    
    this.doc.setFontSize(10);
    this.doc.setTextColor(100, 100, 100);
    
    let xPos = this.marginLeft;
    headers.forEach((header, i) => {
      this.doc.text(header, xPos, this.currentY);
      xPos += colWidths[i];
    });

    this.currentY += 5;
    this.doc.line(this.marginLeft, this.currentY, this.pageWidth - this.marginRight, this.currentY);
    this.currentY += 5;

    // Table content
    this.doc.setTextColor(0, 0, 0);
    let totalValue = 0;

    data.products.forEach(({ product, quantity }) => {
      if (this.checkPageBreak(20)) {
        xPos = this.marginLeft;
        headers.forEach((header, i) => {
          this.doc.text(header, xPos, this.currentY);
          xPos += colWidths[i];
        });
        this.currentY += 10;
      }

      const total = product.price * quantity;
      totalValue += total;

      xPos = this.marginLeft;
      this.doc.text(product.model, xPos, this.currentY);
      this.doc.text(quantity.toString(), xPos + colWidths[0], this.currentY);
      this.doc.text(formatCurrency(product.price), xPos + colWidths[0] + colWidths[1], this.currentY);
      this.doc.text(formatCurrency(total), xPos + colWidths[0] + colWidths[1] + colWidths[2], this.currentY);

      this.currentY += 7;
    });

    // Total
    this.currentY += 5;
    this.doc.line(this.marginLeft, this.currentY, this.pageWidth - this.marginRight, this.currentY);
    this.currentY += 10;
    
    this.doc.setFontSize(12);
    this.doc.setFont("helvetica", "bold");
    this.doc.text(
      `Total: ${formatCurrency(totalValue)}`,
      this.pageWidth - this.marginRight,
      this.currentY,
      { align: 'right' }
    );
    
    this.currentY += 20;
  }

  private addFooter(data: ProposalData) {
    const footerY = this.pageHeight - 20;
    
    this.doc.setFontSize(8);
    this.doc.setTextColor(100, 100, 100);
    
    const validityDate = new Date(data.date.getTime() + (data.validityDays * 24 * 60 * 60 * 1000));
    this.doc.text(
      `Proposta válida até ${validityDate.toLocaleDateString()}`,
      this.pageWidth / 2,
      footerY - 10,
      { align: 'center' }
    );
    
    this.doc.text(
      '© U-sol Energia Solar - Todos os direitos reservados',
      this.pageWidth / 2,
      footerY,
      { align: 'center' }
    );
  }

  public generate(data: ProposalData): void {
    this.addHeader(data);
    this.addCustomerInfo(data);
    this.addProductsTable(data);
    this.addFooter(data);

    // Save the PDF
    const fileName = `proposta-${data.customer.name.toLowerCase().replace(/\s+/g, '-')}.pdf`;
    this.doc.save(fileName);
  }
}