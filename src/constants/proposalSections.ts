export const SECTION_TYPES = [
  {
    id: 'introduction',
    label: 'Introdução',
    defaultTitle: 'Introdução',
    defaultContent: `
      <div class="space-y-4">
        <p>Prezado(a) {{CUSTOMER_NAME}},</p>
        
        <p>É com satisfação que apresentamos nossa proposta comercial para implementação do seu sistema de energia solar fotovoltaica, desenvolvido especialmente para atender suas necessidades.</p>
        
        <p>Com base no seu consumo médio mensal de {{MONTHLY_CONSUMPTION}} kWh, desenvolvemos uma solução completa que proporcionará:</p>
        
        <ul class="list-disc pl-6 space-y-2">
          <li>Redução significativa na sua conta de energia</li>
          <li>Independência energética</li>
          <li>Valorização do seu imóvel</li>
          <li>Contribuição para um futuro sustentável</li>
        </ul>
      </div>
    `,
    required: true
  },
  {
    id: 'technical',
    label: 'Especificações Técnicas',
    defaultTitle: 'Especificações do Sistema',
    defaultContent: `
      <div class="space-y-6">
        <div class="grid grid-cols-2 gap-4">
          <div class="bg-white p-4 rounded-lg border border-gray-200">
            <div class="text-sm text-gray-500">Potência Total</div>
            <div class="text-2xl font-semibold">{{SYSTEM_POWER}} kWp</div>
          </div>
          
          <div class="bg-white p-4 rounded-lg border border-gray-200">
            <div class="text-sm text-gray-500">Produção Mensal</div>
            <div class="text-2xl font-semibold">{{MONTHLY_PRODUCTION}} kWh</div>
          </div>
          
          <div class="bg-white p-4 rounded-lg border border-gray-200">
            <div class="text-sm text-gray-500">Área Necessária</div>
            <div class="text-2xl font-semibold">{{REQUIRED_AREA}} m²</div>
          </div>
          
          <div class="bg-white p-4 rounded-lg border border-gray-200">
            <div class="text-sm text-gray-500">Peso no Telhado</div>
            <div class="text-2xl font-semibold">{{ROOF_WEIGHT}} kg</div>
          </div>
        </div>
      </div>
    `,
    required: true
  },
  {
    id: 'equipment',
    label: 'Equipamentos',
    defaultTitle: 'Equipamentos do Sistema',
    defaultContent: `
      <div class="space-y-4">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Equipamento</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fabricante</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Modelo</th>
              <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Quantidade</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Garantia</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            {{EQUIPMENT_LIST}}
          </tbody>
        </table>
      </div>
    `,
    required: true
  },
  {
    id: 'financial',
    label: 'Análise Financeira',
    defaultTitle: 'Análise Financeira',
    defaultContent: `
      <div class="space-y-6">
        <div class="grid grid-cols-2 gap-4">
          <div class="bg-white p-4 rounded-lg border border-gray-200">
            <div class="text-sm text-gray-500">Economia Mensal</div>
            <div class="text-2xl font-semibold">{{MONTHLY_SAVINGS}}</div>
          </div>
          
          <div class="bg-white p-4 rounded-lg border border-gray-200">
            <div class="text-sm text-gray-500">Economia Anual</div>
            <div class="text-2xl font-semibold">{{ANNUAL_SAVINGS}}</div>
          </div>
          
          <div class="bg-white p-4 rounded-lg border border-gray-200">
            <div class="text-sm text-gray-500">Tempo de Retorno</div>
            <div class="text-2xl font-semibold">{{PAYBACK_YEARS}} anos</div>
          </div>
          
          <div class="bg-white p-4 rounded-lg border border-gray-200">
            <div class="text-sm text-gray-500">Investimento Total</div>
            <div class="text-2xl font-semibold">{{TOTAL_INVESTMENT}}</div>
          </div>
        </div>

        <div class="mt-8">
          <h4 class="text-lg font-medium mb-4">Gráfico de Retorno do Investimento</h4>
          {{PAYBACK_CHART}}
        </div>
      </div>
    `,
    required: true
  },
  {
    id: 'benefits',
    label: 'Benefícios',
    defaultTitle: 'Benefícios do Sistema',
    defaultContent: `
      <div class="grid grid-cols-2 gap-6">
        <div class="bg-white p-6 rounded-lg border border-yellow-100">
          <h3 class="text-lg font-semibold text-yellow-600 mb-3">Economia Significativa</h3>
          <p>Reduza em até 95% sua conta de energia elétrica com um sistema dimensionado especialmente para você.</p>
        </div>
        
        <div class="bg-white p-6 rounded-lg border border-green-100">
          <h3 class="text-lg font-semibold text-green-600 mb-3">Energia Limpa</h3>
          <p>Produza sua própria energia de forma sustentável e contribua para um futuro mais limpo.</p>
        </div>
        
        <div class="bg-white p-6 rounded-lg border border-blue-100">
          <h3 class="text-lg font-semibold text-blue-600 mb-3">Valorização do Imóvel</h3>
          <p>Aumente o valor do seu imóvel com uma solução moderna e eficiente de geração de energia.</p>
        </div>
        
        <div class="bg-white p-6 rounded-lg border border-purple-100">
          <h3 class="text-lg font-semibold text-purple-600 mb-3">Garantia Estendida</h3>
          <p>Equipamentos com garantia de até 25 anos, assegurando a eficiência e durabilidade do seu investimento.</p>
        </div>
      </div>
    `,
    required: false
  },
  {
    id: 'charts',
    label: 'Gráficos',
    defaultTitle: 'Análise Gráfica',
    defaultContent: `
      <div class="space-y-8">
        <div>
          <h4 class="text-lg font-medium mb-4">Comparativo de Consumo</h4>
          {{CONSUMPTION_CHART}}
        </div>

        <div>
          <h4 class="text-lg font-medium mb-4">Economia Acumulada</h4>
          {{SAVINGS_CHART}}
        </div>
      </div>
    `,
    required: false
  },
  {
    id: 'notes',
    label: 'Observações',
    defaultTitle: 'Observações Importantes',
    defaultContent: `
      <div class="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <ul class="space-y-2 text-gray-600">
          <li>• Esta proposta é válida até {{VALIDITY_DATE}}.</li>
          <li>• O dimensionamento definitivo será confirmado após a vistoria técnica.</li>
          <li>• Garantia de 25 anos para os módulos fotovoltaicos.</li>
          <li>• Garantia de 10 anos para o inversor.</li>
          <li>• Monitoramento remoto incluído.</li>
          <li>• Suporte técnico especializado.</li>
          <li>• Homologação junto à concessionária incluída.</li>
        </ul>
      </div>
    `,
    required: true
  }
];

export const DEFAULT_SECTIONS = SECTION_TYPES.map((section, index) => ({
  id: `default-section-${index}`,
  type: section.id,
  title: section.defaultTitle,
  content: section.defaultContent,
  order: index,
  required: section.required
}));