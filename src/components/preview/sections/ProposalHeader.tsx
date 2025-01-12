import React from 'react';
import { ProposalData } from '../../../types/proposal';
import { Logo } from '../../Logo';

interface ProposalHeaderProps {
  data: ProposalData;
}

export function ProposalHeader({ data }: ProposalHeaderProps) {
  return (
    <div className="relative h-[400px]">
      <div 
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom right, rgba(0,0,0,0.7), rgba(0,0,0,0.5)), url(https://images.unsplash.com/photo-1508514177221-188b1cf16e9d)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="absolute top-8 left-8">
        <Logo className="h-16" />
      </div>

      <div className="absolute bottom-16 left-8 text-white">
        <h1 className="text-4xl font-bold mb-4">
          Proposta Técnica e Comercial
        </h1>
        <div className="text-xl opacity-90">
          Preparado especialmente para:
        </div>
        <div className="text-3xl font-semibold mt-2">
          {data.customer.name}
        </div>
      </div>

      <div className="absolute top-8 right-8 text-white">
        <p className="text-sm opacity-80">
          {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}