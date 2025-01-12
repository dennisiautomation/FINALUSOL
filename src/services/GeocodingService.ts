import { Location } from '../types/solar';

export class GeocodingService {
  private readonly API_URL = 'https://nominatim.openstreetmap.org/search';
  
  async getCoordinates(location: Location): Promise<Location> {
    try {
      const address = `${location.street}, ${location.city}, ${location.state}, Brazil`;
      const params = new URLSearchParams({
        q: address,
        format: 'json',
        limit: '1'
      });

      const response = await fetch(`${this.API_URL}?${params}`);
      const data = await response.json();

      if (data.length === 0) {
        return location;
      }

      return {
        ...location,
        latitude: parseFloat(data[0].lat),
        longitude: parseFloat(data[0].lon)
      };
    } catch (error) {
      console.error('Erro ao obter coordenadas:', error);
      return location;
    }
  }
}