import { SOLAR_CONSTANTS } from '../config/solarConstants';

const SOLAR_API_URL = 'https://power.larc.nasa.gov/api/temporal/daily/point';

interface NASAResponse {
  properties: {
    parameter: {
      ALLSKY_SFC_SW_DWN: { [key: string]: number };
    };
  };
}

export async function getSolarIrradiation(latitude: number, longitude: number): Promise<number> {
  try {
    // Validate coordinates
    if (!latitude || !longitude || isNaN(latitude) || isNaN(longitude)) {
      console.warn('Invalid coordinates, using default irradiation value');
      return SOLAR_CONSTANTS.AVERAGE_SUN_HOURS;
    }

    const currentYear = new Date().getFullYear().toString();
    const params = new URLSearchParams({
      parameters: 'ALLSKY_SFC_SW_DWN',
      community: 'RE',
      longitude: longitude.toFixed(4),
      latitude: latitude.toFixed(4),
      format: 'JSON',
      start: currentYear,
      end: currentYear,
    });

    const response = await fetch(`${SOLAR_API_URL}?${params}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`NASA API responded with status: ${response.status}`);
    }

    const data: NASAResponse = await response.json();

    if (!data?.properties?.parameter?.ALLSKY_SFC_SW_DWN) {
      throw new Error('Invalid data format from NASA API');
    }

    // Calculate average daily irradiation
    const values = Object.values(data.properties.parameter.ALLSKY_SFC_SW_DWN);
    if (!values.length) {
      throw new Error('No irradiation data available');
    }

    const average = values.reduce((sum, val) => sum + val, 0) / values.length;
    
    // Convert from Wh/m²/day to kWh/m²/day and ensure positive value
    const irradiation = Math.max(0, average / 1000);
    
    // If irradiation is too low or unrealistic, use default value
    if (irradiation < 1 || irradiation > 10) {
      console.warn('Unrealistic irradiation value, using default');
      return SOLAR_CONSTANTS.AVERAGE_SUN_HOURS;
    }

    return irradiation;
  } catch (error) {
    console.error('Error fetching solar irradiation:', error);
    // Return default value for Brazil if API fails
    return SOLAR_CONSTANTS.AVERAGE_SUN_HOURS;
  }
}