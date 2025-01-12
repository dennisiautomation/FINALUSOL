export class SolarIrradiationService {
  private readonly API_URL = 'https://power.larc.nasa.gov/api/temporal/daily/point';

  async getIrradiation(latitude: number, longitude: number): Promise<number> {
    try {
      const params = new URLSearchParams({
        parameters: 'ALLSKY_SFC_SW_DWN',
        community: 'RE',
        longitude: longitude.toString(),
        latitude: latitude.toString(),
        format: 'JSON',
        start: new Date().getFullYear().toString(),
        end: new Date().getFullYear().toString()
      });

      const response = await fetch(`${this.API_URL}?${params}`);
      const data = await response.json();

      const values = Object.values(data.properties.parameter.ALLSKY_SFC_SW_DWN);
      const average = values.reduce((sum: number, val: number) => sum + val, 0) / values.length;
      
      return average / 1000; // Converter para kWh/m²/dia
    } catch (error) {
      console.error('Erro ao obter irradiação solar:', error);
      return 4.5; // Valor médio para o Brasil em caso de erro
    }
  }
}