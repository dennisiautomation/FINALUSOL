import { jsPDF } from 'jspdf';
import { ProposalData } from '../../types/proposal';
import { HeaderSection } from './sections/HeaderSection';
import { CustomerSection } from './sections/CustomerSection';
import { TechnicalSection } from './sections/TechnicalSection';
import { ProductsSection } from './sections/ProductsSection';
import { BenefitsSection } from './sections/BenefitsSection';
import { FinancialSection } from './sections/FinancialSection';
import { ChartsSection } from './sections/ChartsSection';
import { FooterSection } from './sections/FooterSection';

export class PDFGeneratorService {
  private doc: jsPDF;
  private currentY: number = 0;
  private pageHeight: number;
  private pageWidth: number = 210; // A4

  constructor() {
    this.doc = new jsPDF();
    this.pageHeight = this.doc.internal.pageSize.height;
    this.setupDocument();
  }

  private setupDocument() {
    this.doc.setFont("helvetica");
  }

  private addNewPage() {
    this.doc.addPage();
    this.currentY = 20;
  }

  private checkPageBreak(height: number): boolean {
    if (this.currentY + height > this.pageHeight - 20) {
      this.addNewPage();
      return true;
    }
    return false;
  }

  public generate(data: ProposalData): void {
    const sections = [
      new HeaderSection(this.doc),
      new CustomerSection(this.doc),
      new TechnicalSection(this.doc),
      new ProductsSection(this.doc),
      new BenefitsSection(this.doc),
      new FinancialSection(this.doc),
      new ChartsSection(this.doc),
      new FooterSection(this.doc)
    ];

    sections.forEach(section => {
      if (this.checkPageBreak(section.estimatedHeight)) {
        this.currentY = 20;
      }
      this.currentY = section.render(data, this.currentY);
    });

    const fileName = `proposta-${data.customer.name.toLowerCase().replace(/\s+/g, '-')}.pdf`;
    this.doc.save(fileName);
  }
}