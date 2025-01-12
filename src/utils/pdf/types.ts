import { jsPDF } from 'jspdf';
import { ProposalData } from '../../types/proposal';

export interface PDFSection {
  draw(doc: jsPDF, data: ProposalData): Promise<void>;
}

export interface ImageOptions {
  x: number;
  y: number;
  width: number;
  height: number;
}