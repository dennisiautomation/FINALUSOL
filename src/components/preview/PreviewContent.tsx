import React from 'react';
import { CustomerInfoSection } from '../templates/sections/CustomerInfoSection';
import { SystemSpecsSection } from '../templates/sections/SystemSpecsSection';
import { EquipmentSection } from '../templates/sections/EquipmentSection';
import { FinancialSection } from '../templates/sections/FinancialSection';
import { BenefitsSection } from '../templates/sections/BenefitsSection';
import { ChartPreview } from '../proposals/charts/ChartPreview';

interface PreviewContentProps {
  template: any;
  data: any;
}

export function PreviewContent({ template, data }: PreviewContentProps) {
  return (
    <div className="p-8 space-y-12">
      <CustomerInfoSection customer={data.customer} />
      <SystemSpecsSection data={data.technical} />
      <EquipmentSection equipment={data.products} />
      <BenefitsSection />
      <FinancialSection data={data.financial} />
      <ChartPreview data={data} />
    </div>
  );
}