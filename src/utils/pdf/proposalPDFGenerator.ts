import html2pdf from 'html2pdf.js';
import { ProposalData } from '../../types/proposal';

export async function generateProposalPDF(data: ProposalData): Promise<void> {
  try {
    // Captura o elemento que contém a proposta
    const element = document.getElementById('proposal-preview');
    
    if (!element) {
      throw new Error('Elemento da proposta não encontrado');
    }

    const options = {
      margin: 10,
      filename: `proposta-${data.customer.name.toLowerCase().replace(/\s+/g, '-')}.pdf`,
      image: { 
        type: 'jpeg', 
        quality: 0.98 
      },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        logging: false,
        allowTaint: true,
        foreignObjectRendering: true
      },
      jsPDF: { 
        unit: 'mm', 
        format: 'a4', 
        orientation: 'portrait',
        compress: true
      }
    };

    await html2pdf().set(options).from(element).save();
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    throw error;
  }
}