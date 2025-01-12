import React from 'react';
import { ProposalHeader } from './sections/ProposalHeader';
import { CustomerSection } from './sections/CustomerSection';
import { TechnicalSection } from './sections/TechnicalSection';
import { EquipmentSection } from './sections/EquipmentSection';
import { BenefitsSection } from './sections/BenefitsSection';
import { FinancialSection } from './sections/FinancialSection';
import { ChartsSection } from './sections/ChartsSection';
import { ProposalData } from '../../types/proposal';

interface ProposalPreviewProps {
  data: ProposalData;
}

export function ProposalPreview({ data }: ProposalPreviewProps) {
  return (
    <div id="proposal-preview" className="bg-white min-h-screen">
      <ProposalHeader data={data} />
      <div className="max-w-7xl mx-auto p-8 space-y-12">
        <CustomerSection customer={data.customer} />
        <TechnicalSection data={data.technical} />
        <EquipmentSection equipment={data.products} />
        <BenefitsSection />
        <FinancialSection data={data.financial} />
        <ChartsSection data={data} />
        
        {/* Footer */}
        <div className="mt-12 pt-8 border-t text-center text-sm text-gray-500">
          <p>Proposta válida por {data.validityDays} dias</p>
          <p className="mt-2">© {new Date().getFullYear()} U-sol Energia Solar - Todos os direitos reservados</p>
        </div>
      </div>
    </div>
  );
}