export function maskCEP(value: string): string {
  // Remove tudo que não é número
  value = value.replace(/\D/g, '');
  
  // Limita a 8 dígitos
  value = value.slice(0, 8);
  
  // Adiciona o hífen após os 5 primeiros dígitos
  if (value.length > 5) {
    value = value.replace(/^(\d{5})(\d)/, '$1-$2');
  }
  
  return value;
}