import { useState } from 'react';
import { BRAZILIAN_STATES } from '../constants/locations';

interface State {
  uf: string;
  name: string;
}

interface City {
  name: string;
  stateUF: string;
}

export function useBrazilianStates() {
  const [selectedState, setSelectedState] = useState<string>('');
  const [cities, setCities] = useState<City[]>([]);

  const loadCities = async (uf: string) => {
    if (!uf) return;
    
    try {
      const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`);
      const data = await response.json();
      setCities(data.map((city: any) => ({
        name: city.nome,
        stateUF: uf
      })));
    } catch (error) {
      console.error('Error loading cities:', error);
      setCities([]);
    }
  };

  const handleStateChange = (uf: string) => {
    setSelectedState(uf);
    loadCities(uf);
  };

  return {
    states: BRAZILIAN_STATES,
    cities,
    selectedState,
    setSelectedState: handleStateChange
  };
}