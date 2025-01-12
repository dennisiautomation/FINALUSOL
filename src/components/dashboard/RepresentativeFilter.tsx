import React from 'react';
import { useRepresentativesStore } from '../../store/representatives';

interface RepresentativeFilterProps {
  selectedId: string | null;
  onChange: (id: string | null) => void;
}

export function RepresentativeFilter({ selectedId, onChange }: RepresentativeFilterProps) {
  const { representatives } = useRepresentativesStore();

  return (
    <div className="flex items-center space-x-4">
      <label htmlFor="representative" className="text-sm font-medium text-gray-700">
        Filter by Representative:
      </label>
      <select
        id="representative"
        value={selectedId || ''}
        onChange={(e) => onChange(e.target.value || null)}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm rounded-md"
      >
        <option value="">All Representatives</option>
        {representatives.map((rep) => (
          <option key={rep.id} value={rep.id}>
            {rep.name} - {rep.region}
          </option>
        ))}
      </select>
    </div>
  );
}