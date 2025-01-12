import { jsPDF } from 'jspdf';
import { ProposalData } from '../types/proposal';
import { useTemplatesStore } from '../store/templates';
import { drawSection } from '../utils/pdf/sections/sectionRenderer';
import { drawHeader } from '../utils/pdf/sections/headerSection';
import { drawFooter } from '../utils/pdf/sections/footerSection';

export class ProposalGeneratorService {
  private doc: jsPDF;
  private currentY: number = 20;
  private pageHeight: number;
  private pageWidth: number = 210; // A4 width in mm

  constructor() {
    this.doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    this.pageHeight = this.doc.internal.pageSize.height;
    this.setupDocument();
  }

  private setupDocument() {
    this.doc.setFont("helvetica");
    this.doc.setFontSize(12);
  }

  private addNewPage() {
    this.doc.addPage();
    this.currentY = 20;
  }

  private checkPageBreak(height: number): boolean {
    const margin = 20;
    if (this.currentY + height > this.pageHeight - margin) {
      this.addNewPage();
      return true;
    }
    return false;
  }

  public async generate(data: ProposalData): Promise<void> {
    try {
      // Get active template
      const { templates, activeTemplate } = useTemplatesStore.getState();
      const template = templates.find(t => t.id === activeTemplate);

      if (!template) {
        throw new Error('No active template found');
      }

      // Draw header
      this.currentY = await drawHeader(this.doc, data, this.currentY);

      // Draw each section
      for (const section of template.sections) {
        // Check if we need a new page
        if (this.checkPageBreak(100)) {
          continue;
        }

        try {
          this.currentY = await drawSection(
            this.doc,
            section,
            data,
            this.currentY,
            template.styling
          );
        } catch (error) {
          console.error(`Error drawing section ${section.type}:`, error);
          // Continue with next section
          this.currentY += 20;
        }
      }

      // Add footer to all pages
      const totalPages = this.doc.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        this.doc.setPage(i);
        await drawFooter(this.doc, data, this.pageHeight - 20);
      }

      // Save the PDF
      const fileName = `proposta-${data.customer.name.toLowerCase().replace(/\s+/g, '-')}.pdf`;
      this.doc.save(fileName);

    } catch (error) {
      console.error('Error generating PDF:', error);
      throw error;
    }
  }
}