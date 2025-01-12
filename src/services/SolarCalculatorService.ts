import { LocationService } from './LocationService';
import { GeocodingService } from './GeocodingService';
import { getSolarIrradiation } from './solarApi';
import { calculateSystemSize, calculatePanelCount, calculateArea, calculateMonthlyProduction } from '../utils/calculations/systemSize';
import { SolarCalculation } from '../types/solar';
import { ENERGY_RATES, SOLAR_CONSTANTS } from '../config/solarConstants';

export class SolarCalculatorService {
  private locationService: LocationService;
  private geocodingService: GeocodingService;

  constructor() {
    this.locationService = new LocationService();
    this.geocodingService = new GeocodingService();
  }

  async calculateFromCEP(params: {
    cep: string;
    monthlyConsumption: number;
    availableArea: number;
  }): Promise<SolarCalculation> {
    try {
      // Get location data
      const location = await this.locationService.getLocationFromCEP(params.cep);
      if (!location?.state) {
        throw new Error('CEP não encontrado');
      }

      // Get coordinates
      const locationWithCoords = await this.geocodingService.getCoordinates(location);
      
      // Get solar irradiation data
      const irradiation = locationWithCoords.latitude && locationWithCoords.longitude
        ? await getSolarIrradiation(locationWithCoords.latitude, locationWithCoords.longitude)
        : SOLAR_CONSTANTS.AVERAGE_SUN_HOURS;

      // Calculate system requirements
      const systemSize = calculateSystemSize(params.monthlyConsumption, irradiation);
      const panelCount = calculatePanelCount(systemSize);
      const requiredArea = calculateArea(panelCount);
      const monthlyProduction = calculateMonthlyProduction(systemSize, irradiation);

      // Get state-specific energy rate
      const energyRate = ENERGY_RATES[location.state] || SOLAR_CONSTANTS.DEFAULT_ENERGY_RATE;

      // Calculate financial estimates
      const monthlySavings = monthlyProduction * energyRate * (1 - SOLAR_CONSTANTS.TUSD_FIO_B);
      const annualSavings = monthlySavings * 12;
      const totalInvestment = systemSize * SOLAR_CONSTANTS.COST_PER_KWP;
      const paybackYears = totalInvestment / annualSavings;

      return {
        location: locationWithCoords,
        radiation: irradiation,
        systemRequirements: {
          systemSize,
          panelCount,
          requiredArea
        },
        production: {
          monthly: monthlyProduction,
          annual: monthlyProduction * 12
        },
        financials: {
          monthlySavings,
          annualSavings,
          totalInvestment,
          paybackYears
        },
        isViable: requiredArea <= params.availableArea
      };
    } catch (error) {
      console.error('Error in solar calculation:', error);
      throw error instanceof Error ? error : new Error('Erro ao realizar cálculo solar');
    }
  }
}