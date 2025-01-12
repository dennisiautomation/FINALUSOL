import { useState, useEffect } from 'react';
import { getSolarIrradiation, getLocationFromCEP } from '../services/solarApi';
import { Location } from '../types/solar';

export function useSolarData(cep: string) {
  const [location, setLocation] = useState<Location | null>(null);
  const [irradiation, setIrradiation] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!cep || cep.length < 8) return;

      setIsLoading(true);
      setError(null);

      try {
        // Obter localização a partir do CEP
        const locationData = await getLocationFromCEP(cep);
        setLocation(locationData);

        // Se temos coordenadas, buscar dados de irradiação
        if (locationData.latitude && locationData.longitude) {
          const irradiationData = await getSolarIrradiation(
            locationData.latitude,
            locationData.longitude
          );
          setIrradiation(irradiationData);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao buscar dados solares');
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [cep]);

  return { location, irradiation, isLoading, error };
}