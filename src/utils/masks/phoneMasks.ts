export function maskPhone(value: string): string {
  // Remove tudo que não é número
  value = value.replace(/\D/g, '');
  
  // Limita a 11 dígitos
  value = value.slice(0, 11);
  
  // Adiciona parênteses e hífen
  return value
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2');
}