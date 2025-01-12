export const SOLAR_CONSTANTS = {
  PERFORMANCE_RATIO: 0.80, // Updated from 0.75 to account for modern equipment
  SYSTEM_EFFICIENCY: 0.85, // Updated from 0.80
  DEFAULT_PANEL_POWER: 550, // Watts
  DEFAULT_PANEL_AREA: 2.2, // m² (updated to reflect current panel sizes)
  COST_PER_KWP: 4500, // R$/kWp
  AVERAGE_SUN_HOURS: 4.5, // Default value for Brazil
  TUSD_FIO_B: 0.35 // Average TUSD value
} as const;

// Updated energy rates by state
export const ENERGY_RATES: Record<string, number> = {
  SP: 0.89, // São Paulo
  RJ: 0.95, // Rio de Janeiro
  MG: 0.92, // Minas Gerais
  RS: 0.85, // Rio Grande do Sul
  PR: 0.89, // Paraná
  SC: 0.88, // Santa Catarina
  BA: 0.91, // Bahia
  ES: 0.88, // Espírito Santo
  GO: 0.87, // Goiás
  MT: 0.86, // Mato Grosso
  MS: 0.85, // Mato Grosso do Sul
  DF: 0.84  // Distrito Federal
};