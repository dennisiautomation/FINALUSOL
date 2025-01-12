export function maskCPF(value: string): string {
  // Remove tudo que não é número
  value = value.replace(/\D/g, '');
  
  // Limita a 11 dígitos
  value = value.slice(0, 11);
  
  // Adiciona pontos e traço
  return value
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

export function maskCNPJ(value: string): string {
  // Remove tudo que não é número
  value = value.replace(/\D/g, '');
  
  // Limita a 14 dígitos
  value = value.slice(0, 14);
  
  // Adiciona pontos, barra e traço
  return value
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2');
}