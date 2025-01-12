import html2pdf from 'html2pdf.js';
import { ProposalData } from '../../types/proposal';
import { PDFGenerationOptions } from '../types/PDFOptions';

export class ProposalPDFGenerator {
  private readonly options: PDFGenerationOptions = {
    margin: 10,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
      scale: 2,
      useCORS: true,
      logging: false,
      allowTaint: true,
      imageTimeout: 15000,
      onclone: (doc: Document) => {
        // Handle background images
        const elements = doc.querySelectorAll('[style*="background-image"]');
        elements.forEach(el => {
          const style = window.getComputedStyle(el);
          (el as HTMLElement).style.backgroundImage = style.backgroundImage;
        });
      }
    },
    jsPDF: { 
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait',
      compress: true,
      hotfixes: ['px_scaling']
    }
  };

  public async generatePDF(data: ProposalData): Promise<void> {
    try {
      const element = document.getElementById('proposal-preview');
      if (!element) {
        throw new Error('Preview element not found');
      }

      // Prepare filename
      const filename = `proposta-${data.customer.name.toLowerCase().replace(/\s+/g, '-')}.pdf`;
      
      // Create worker with options
      const worker = html2pdf().set({
        ...this.options,
        filename,
        pagebreak: { mode: 'avoid-all' }
      });

      // Generate PDF
      await worker.from(element).save();

    } catch (error) {
      console.error('PDF generation failed:', error);
      throw new Error('Falha ao gerar PDF. Por favor, tente novamente.');
    }
  }
}