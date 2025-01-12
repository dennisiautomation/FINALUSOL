import { Location } from '../types/solar';

export class LocationService {
  private readonly API_URL = 'https://viacep.com.br/ws';
  
  async getLocationFromCEP(cep: string): Promise<Location> {
    try {
      const formattedCEP = cep.replace(/\D/g, '');
      const response = await fetch(`${this.API_URL}/${formattedCEP}/json/`);
      const data = await response.json();
      
      if (data.erro) {
        throw new Error('CEP não encontrado');
      }

      return {
        city: data.localidade,
        state: data.uf,
        street: data.logradouro,
        neighborhood: data.bairro,
        latitude: null, // Será preenchido pelo GeocodingService
        longitude: null
      };
    } catch (error) {
      throw new Error('Erro ao buscar localização: ' + error.message);
    }
  }
}