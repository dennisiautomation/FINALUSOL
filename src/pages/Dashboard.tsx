import React, { useState } from 'react';
import { useAuthStore } from '../store/auth';
import { SalesMetrics } from '../components/dashboard/SalesMetrics';
import { RepresentativeStats } from '../components/dashboard/RepresentativeStats';
import { SalesChart } from '../components/dashboard/SalesChart';
import { RepresentativeFilter } from '../components/dashboard/RepresentativeFilter';

export default function Dashboard() {
  const { user } = useAuthStore();
  const isAdmin = user?.role === 'admin';
  const [selectedRepId, setSelectedRepId] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">
          {isAdmin ? 'Dashboard' : `Bem-vindo, ${user?.name}`}
        </h1>
        {isAdmin && (
          <RepresentativeFilter
            selectedId={selectedRepId}
            onChange={setSelectedRepId}
          />
        )}
      </div>

      <SalesMetrics representativeId={!isAdmin ? user?.id : selectedRepId || undefined} />
      
      {isAdmin ? (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SalesChart representativeId={selectedRepId} />
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Estatísticas Rápidas</h2>
              {/* Add more stats here */}
            </div>
          </div>
          <RepresentativeStats highlightId={selectedRepId} />
        </>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          <SalesChart representativeId={user?.id} />
        </div>
      )}
    </div>
  );
}