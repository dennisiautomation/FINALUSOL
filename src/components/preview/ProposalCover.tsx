import React from 'react';

interface ProposalCoverProps {
  customer: any;
  date: Date;
}

export function ProposalCover({ customer, date }: ProposalCoverProps) {
  return (
    <div className="relative h-[1123px] w-[794px]">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80")',
          backgroundPosition: 'center 40%'
        }}
      >
        {/* Semi-transparent overlay */}
        <div className="absolute inset-0 bg-black/30" />
      </div>
      
      {/* White Card Overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[50px] p-16">
        <div className="text-center space-y-8">
          <h2 className="text-4xl font-bold text-[#3B82B4]">PROPOSTA COMERCIAL</h2>
          
          <div className="space-y-2">
            <h1 className="text-6xl font-bold text-[#00A651]">Energia</h1>
            <h1 className="text-6xl font-bold text-[#3B82B4]">Solar</h1>
          </div>

          <div className="mt-12 text-gray-600">
            <p className="text-xl">Preparado especialmente para:</p>
            <p className="text-3xl font-semibold mt-2">{customer.name}</p>
          </div>
        </div>
      </div>

      {/* Date */}
      <div className="absolute top-8 right-8">
        <p className="text-lg text-white font-medium">{date.toLocaleDateString()}</p>
      </div>
    </div>
  );
}