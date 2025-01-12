import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { ProposalPreview } from '../components/preview/ProposalPreview';
import { ProposalPDFGenerator } from '../utils/pdf/generators/ProposalPDFGenerator';

export default function ProposalPreviewPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);
  const proposalData = location.state;

  if (!proposalData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <h2 className="text-xl font-medium text-gray-900">Proposta não encontrada</h2>
          <p className="mt-2 text-gray-500">Os dados da proposta são inválidos ou não foram fornecidos</p>
          <Button className="mt-4" onClick={() => navigate('/proposals')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        </div>
      </div>
    );
  }

  const handleGeneratePDF = async () => {
    setIsGenerating(true);
    try {
      const generator = new ProposalPDFGenerator();
      await generator.generatePDF(proposalData);
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <Button variant="outline" onClick={() => navigate('/proposals')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <Button 
            onClick={handleGeneratePDF}
            disabled={isGenerating}
          >
            {isGenerating ? 'Gerando PDF...' : 'Gerar PDF'}
          </Button>
        </div>

        <ProposalPreview data={proposalData} />
      </div>
    </div>
  );
}