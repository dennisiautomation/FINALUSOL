import React from 'react';
import { Download } from 'lucide-react';
import { Button } from '../ui/Button';
import { downloadProductTemplate } from '../../utils/productImport/downloadTemplate';
import { ProductTemplateType } from '../../utils/productImport/templates';

const TEMPLATE_OPTIONS = [
  { value: 'solarPanel', label: 'Painéis Solares' },
  { value: 'inverter', label: 'Inversores' },
  { value: 'structure', label: 'Estruturas' },
  { value: 'cable', label: 'Cabos' },
  { value: 'stringBox', label: 'String Box' },
] as const;

interface TemplateSelectorProps {
  orientation?: 'horizontal' | 'vertical';
}

export function TemplateSelector({ orientation = 'horizontal' }: TemplateSelectorProps) {
  const [selectedType, setSelectedType] = React.useState<ProductTemplateType>('solarPanel');

  return (
    <div className={`flex ${orientation === 'vertical' ? 'flex-col space-y-2' : 'space-x-2'}`}>
      <select
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value as ProductTemplateType)}
        className="rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
      >
        {TEMPLATE_OPTIONS.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <Button 
        variant="outline" 
        onClick={() => downloadProductTemplate(selectedType)}
        className={orientation === 'vertical' ? 'w-full justify-start' : ''}
      >
        <Download className="h-5 w-5 mr-2" />
        Baixar Modelo CSV
      </Button>
    </div>
  );
}