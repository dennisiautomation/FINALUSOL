import { PDFGenerator } from './pdf/PDFGenerator';
import { ProposalData } from '../types/proposal';

export async function generateProposalPDF(data: ProposalData): Promise<void> {
  const generator = new PDFGenerator();
  await generator.generate(data);
}