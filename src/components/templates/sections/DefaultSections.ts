import { ProposalSection } from '../../../types/proposal';
import { PLACEHOLDERS } from '../../../utils/proposalPlaceholders';

export const DEFAULT_SECTIONS: Partial<ProposalSection>[] = [
  {
    type: 'introduction',
    title: 'Introdução',
    content: `
      <p>Prezado(a) ${PLACEHOLDERS.CUSTOMER_NAME},</p>
      
      <p>Obrigado por escolher a U-sol Energia Solar! Estamos prontos para atender às suas necessidades energéticas com uma solução eficiente e sustentável.</p>
      
      <p>Com nosso sistema de energia solar, você:</p>
      <ul>
        <li>Reduz significativamente sua conta de energia elétrica</li>
        <li>Protege-se contra os aumentos de tarifa</li>
        <li>Valoriza seu imóvel e contribui para o meio ambiente</li>
      </ul>
      
      <p>Confira abaixo os detalhes personalizados da sua proposta.</p>
    `,
    order: 0,
    isRequired: true
  },
  {
    type: 'customer_info',
    title: 'Informações do Cliente',
    content: '',
    order: 1,
    isRequired: true
  },
  {
    type: 'system_specs',
    title: 'Resumo Técnico do Sistema',
    content: '',
    order: 2,
    isRequired: true
  },
  {
    type: 'equipment',
    title: 'Equipamentos Selecionados',
    content: '',
    order: 3,
    isRequired: true
  },
  {
    type: 'benefits',
    title: 'Benefícios do Sistema',
    content: `
      <div class="grid grid-cols-2 gap-6">
        <div class="bg-white p-6 rounded-lg shadow-sm border border-yellow-100">
          <h3 class="text-lg font-semibold text-yellow-600 mb-3">Economia Significativa</h3>
          <p>Reduza em até 90% sua conta de energia elétrica com um sistema dimensionado especialmente para você.</p>
        </div>
        
        <div class="bg-white p-6 rounded-lg shadow-sm border border-green-100">
          <h3 class="text-lg font-semibold text-green-600 mb-3">Créditos Energéticos</h3>
          <p>Seus créditos de energia são válidos por até 60 meses, permitindo compensação em diferentes períodos do ano.</p>
        </div>
        
        <div class="bg-white p-6 rounded-lg shadow-sm border border-blue-100">
          <h3 class="text-lg font-semibold text-blue-600 mb-3">Monitoramento Remoto</h3>
          <p>Acompanhe a produção do seu sistema em tempo real através do nosso aplicativo de monitoramento.</p>
        </div>
        
        <div class="bg-white p-6 rounded-lg shadow-sm border border-purple-100">
          <h3 class="text-lg font-semibold text-purple-600 mb-3">Garantia Estendida</h3>
          <p>Equipamentos com garantia de até 25 anos, assegurando a eficiência e durabilidade do seu investimento.</p>
        </div>
      </div>
    `,
    order: 4,
    isRequired: true
  },
  {
    type: 'financial',
    title: 'Análise Financeira',
    content: '',
    order: 5,
    isRequired: true
  },
  {
    type: 'charts',
    title: 'Gráficos',
    content: '',
    order: 6,
    isRequired: true
  },
  {
    type: 'notes',
    title: 'Observações',
    content: `
      <div class="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <ul class="space-y-2 text-gray-600">
          <li>• Esta proposta é baseada nos dados fornecidos pelo cliente.</li>
          <li>• O dimensionamento definitivo será confirmado após a vistoria técnica.</li>
          <li>• Valores podem variar conforme ajustes no projeto.</li>
          <li>• Proposta válida por 10 dias.</li>
        </ul>
      </div>
    `,
    order: 7,
    isRequired: true
  }
];