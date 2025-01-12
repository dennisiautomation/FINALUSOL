export function getProductTypeLabel(type: string) {
  const types = {
    solar_panel: 'Painel Solar',
    inverter: 'Inversor',
    structure: 'Estrutura',
    cables: 'Cabos',
    string_box: 'String Box',
    other: 'Outros',
  };
  return types[type as keyof typeof types] || type;
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);
}