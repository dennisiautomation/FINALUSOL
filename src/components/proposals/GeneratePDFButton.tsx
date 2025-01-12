import React from 'react';
import { FileDown } from 'lucide-react';
import { Button } from '../ui/Button';
import { ProposalData } from '../../types/proposal';
import { generateProposalPDF } from '../../utils/pdf/proposalPDFGenerator';

interface GeneratePDFButtonProps {
  proposal: ProposalData;
}

export function GeneratePDFButton({ proposal }: GeneratePDFButtonProps) {
  const [isGenerating, setIsGenerating] = React.useState(false);

  const handleGeneratePDF = async () => {
    try {
      setIsGenerating(true);
      await generateProposalPDF(proposal);
    } catch (error) {
      console.error('Error generating PDF:', error);
      // You could add a toast notification here
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button 
      onClick={handleGeneratePDF}
      disabled={isGenerating}
      variant="secondary"
    >
      <FileDown className="h-4 w-4 mr-2" />
      {isGenerating ? 'Gerando PDF...' : 'Gerar PDF'}
    </Button>
  );
}