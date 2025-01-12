export const PRODUCT_TEMPLATE_COLUMNS = {
  BASIC_INFO: [
    { key: 'type', label: 'Tipo do Produto', required: true, options: [
      'solar_panel', 'inverter', 'structure', 'cables', 'string_box', 'other'
    ]},
    { key: 'model', label: 'Modelo', required: true },
    { key: 'manufacturer', label: 'Fabricante', required: true },
    { key: 'description', label: 'Descrição', required: false },
    { key: 'price', label: 'Preço (R$)', required: true },
    { key: 'warranty', label: 'Garantia (anos)', required: true },
  ],
  
  SOLAR_PANEL: [
    { key: 'nominalPower', label: 'Potência Nominal (W)', required: true },
    { key: 'efficiency', label: 'Eficiência (%)', required: true },
    { key: 'dimensions.width', label: 'Largura (m)', required: true },
    { key: 'dimensions.height', label: 'Altura (m)', required: true },
    { key: 'weight', label: 'Peso (kg)', required: true },
    { key: 'area', label: 'Área (m²)', required: true },
  ],
  
  INVERTER: [
    { key: 'maxCapacity', label: 'Capacidade Máxima (kWp)', required: true },
    { key: 'efficiency', label: 'Eficiência (%)', required: true },
    { key: 'voltageCompatibility', label: 'Tensões Compatíveis (110,220,380)', required: true },
    { key: 'maxStrings', label: 'Número Máximo de Strings', required: false },
    { key: 'monitoring', label: 'Monitoramento (wifi,app,other)', required: true },
  ],
  
  STRUCTURE: [
    { key: 'structureType', label: 'Tipo de Estrutura (fixed,adjustable,roof,ground)', required: true },
    { key: 'material', label: 'Material (aluminum,galvanized_steel,other)', required: true },
    { key: 'maxWeight', label: 'Peso Máximo Suportado (kg)', required: true },
    { key: 'compatibility.roof', label: 'Compatibilidade Telhado (fiber_cement,ceramic,metallic,other)', required: false },
    { key: 'compatibility.ground', label: 'Compatível com Solo (true/false)', required: false },
  ],
  
  CABLES: [
    { key: 'cableType', label: 'Tipo de Cabo (copper,aluminum)', required: true },
    { key: 'gauge', label: 'Bitola (mm²)', required: true },
    { key: 'maxLength', label: 'Comprimento Máximo (m)', required: false },
  ],
  
  STRING_BOX: [
    { key: 'maxCurrent', label: 'Corrente Máxima (A)', required: true },
    { key: 'maxVoltage', label: 'Tensão Máxima (V)', required: true },
    { key: 'compatibleInverters', label: 'Inversores Compatíveis (códigos separados por vírgula)', required: true },
  ],
};