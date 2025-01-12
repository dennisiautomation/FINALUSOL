import React from 'react';
import { Customer } from '../../../types/customer';
import { Logo } from '../../Logo';

interface ProposalCoverProps {
  customer: Customer;
  date: Date;
  coverLayout?: string;
}

export function ProposalCover({ customer, date, coverLayout }: ProposalCoverProps) {
  return (
    <div className="relative h-[1123px] w-[794px] bg-white">
      {coverLayout ? (
        <img src={coverLayout} alt="Cover" className="w-full h-full object-cover" />
      ) : (
        <div className="p-16 flex flex-col h-full">
          <div className="flex justify-between items-start mb-16">
            <Logo className="h-16" />
            <div className="text-right">
              <p className="text-sm text-gray-500">
                {date.toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">
              Proposta Técnica e Comercial de Energia Solar
            </h1>
            
            <div className="text-xl text-gray-700">
              Preparado especialmente para:
            </div>
            <div className="text-3xl font-semibold text-gray-900 mt-4">
              {customer.name}
            </div>
          </div>

          <div className="text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} U-sol Energia Solar</p>
            <p>Todos os direitos reservados</p>
          </div>
        </div>
      )}
    </div>
  );
}