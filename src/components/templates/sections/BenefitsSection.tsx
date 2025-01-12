import React from 'react';
import { SunMedium, Wallet, Home, Leaf } from 'lucide-react';

export function BenefitsSection() {
  const benefits = [
    {
      icon: <Wallet className="h-8 w-8 text-yellow-600" />,
      title: 'Economia Significativa',
      description: 'Redução de até 90% na sua conta de energia elétrica.',
    },
    {
      icon: <SunMedium className="h-8 w-8 text-yellow-600" />,
      title: 'Energia Limpa',
      description: 'Geração de energia renovável e sustentável.',
    },
    {
      icon: <Home className="h-8 w-8 text-yellow-600" />,
      title: 'Valorização do Imóvel',
      description: 'Aumento do valor do seu imóvel com a instalação solar.',
    },
    {
      icon: <Leaf className="h-8 w-8 text-yellow-600" />,
      title: 'Impacto Ambiental',
      description: 'Contribuição para um futuro mais sustentável.',
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Benefícios do Sistema</h2>

      <div className="grid grid-cols-2 gap-6">
        {benefits.map((benefit, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                {benefit.icon}
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {benefit.title}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {benefit.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}