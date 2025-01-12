import { jsPDF } from 'jspdf';
import { PDFOptions } from '../types';

export class PDFDocument {
  private doc: jsPDF;

  constructor(options: PDFOptions = {}) {
    this.doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      ...options
    });
    this.setupDefaults();
  }

  private setupDefaults() {
    this.doc.setFont('helvetica');
    this.doc.setFontSize(12);
  }

  public getDocument(): jsPDF {
    return this.doc;
  }

  public addPage(): void {
    this.doc.addPage();
  }

  public save(filename: string): void {
    this.doc.save(filename);
  }
}