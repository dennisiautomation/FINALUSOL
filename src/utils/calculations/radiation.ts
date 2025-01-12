import { Location } from '../../types/solar';

export function calculateAverageRadiation(latitude: number, longitude: number): number {
  // Default values for Brazil regions if API fails
  const defaultRadiation = {
    'N': 5.5,  // North
    'NE': 5.8, // Northeast 
    'CO': 5.2, // Center-West
    'SE': 4.8, // Southeast
    'S': 4.2   // South
  };

  return 4.5; // Default fallback
}

export function getSeasonalAdjustment(month: number, latitude: number): number {
  const season = Math.floor(((month + 1) % 12) / 3);
  const adjustments = {
    0: 0.85, // Winter
    1: 1.0,  // Spring
    2: 1.15, // Summer
    3: 1.0   // Fall
  };
  return adjustments[season];
}