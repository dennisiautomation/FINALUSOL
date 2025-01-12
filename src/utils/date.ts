export function formatMonthYear(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    month: 'long',
    year: 'numeric'
  }).format(date);
}

export function getLastNMonths(n: number = 12): Array<{
  date: Date;
  formatted: string;
  key: string; // YYYY-MM format for storage
}> {
  return Array.from({ length: n }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    
    return {
      date,
      formatted: formatMonthYear(date),
      key: date.toISOString().slice(0, 7)
    };
  });
}