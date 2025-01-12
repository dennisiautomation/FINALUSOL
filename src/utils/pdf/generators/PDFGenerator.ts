import html2pdf from 'html2pdf.js';
import { ProposalData } from '../../../types/proposal';
import { PDFOptions } from '../types/PDFOptions';
import { setupPDFOptions } from '../config/pdfConfig';
import { prepareContent } from '../helpers/contentPreparation';
import { handlePDFError } from '../helpers/errorHandling';

export class PDFGenerator {
  private options: PDFOptions;

  constructor() {
    this.options = setupPDFOptions();
  }

  public async generate(data: ProposalData): Promise<void> {
    try {
      const element = document.getElementById('proposal-preview');
      if (!element) {
        throw new Error('Preview element not found');
      }

      const preparedElement = await prepareContent(element);
      await html2pdf().set(this.options).from(preparedElement).save();
    } catch (error) {
      handlePDFError(error);
    }
  }
}