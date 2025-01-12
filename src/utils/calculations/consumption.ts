export function calculateAverageConsumption(monthlyHistory: Record<string, number>): number {
  if (!monthlyHistory || Object.keys(monthlyHistory).length === 0) {
    return 0;
  }

  const values = Object.values(monthlyHistory);
  const validValues = values.filter(value => value > 0);
  
  if (validValues.length === 0) {
    return 0;
  }
  
  const sum = validValues.reduce((acc, curr) => acc + curr, 0);
  return Math.round((sum / validValues.length) * 100) / 100;
}