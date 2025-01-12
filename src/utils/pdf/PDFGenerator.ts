import { jsPDF } from 'jspdf';
import { ProposalData } from '../../types/proposal';
import { CoverSection } from './sections/CoverSection';
import { ContentSection } from './sections/ContentSection';
import { ImageLoader } from './helpers/ImageLoader';
import { colors } from './styles/colors';

export class PDFGenerator {
  private doc: jsPDF;
  private imageLoader: ImageLoader;

  constructor() {
    this.doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    this.imageLoader = new ImageLoader();
  }

  public async generate(data: ProposalData): Promise<void> {
    try {
      // Generate cover page
      const coverSection = new CoverSection();
      await coverSection.draw(this.doc, data);

      // Generate content pages
      const contentSection = new ContentSection();
      await contentSection.draw(this.doc, data);

      // Save the PDF
      const fileName = `proposta-${data.customer.name.toLowerCase().replace(/\s+/g, '-')}.pdf`;
      this.doc.save(fileName);

    } catch (error) {
      console.error('Error generating PDF:', error);
      throw new Error('Failed to generate PDF');
    }
  }
}