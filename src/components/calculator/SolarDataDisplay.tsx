import React from 'react';
import { MapPin, Sun } from 'lucide-react';
import { Location } from '../../types/solar';

interface SolarDataDisplayProps {
  location: Location | null;
  irradiation: number | null;
  isLoading: boolean;
  error: string | null;
}

export function SolarDataDisplay({
  location,
  irradiation,
  isLoading,
  error,
}: SolarDataDisplayProps) {
  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 text-sm">
        {error}
      </div>
    );
  }

  if (!location) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 space-y-4">
      <div className="flex items-center space-x-2 text-gray-600">
        <MapPin className="h-5 w-5" />
        <span>
          {location.city} - {location.state}
        </span>
      </div>
      
      {irradiation && (
        <div className="flex items-center space-x-2 text-gray-600">
          <Sun className="h-5 w-5" />
          <span>
            Irradiação Solar: {irradiation.toFixed(2)} kWh/m²/dia
          </span>
        </div>
      )}
    </div>
  );
}