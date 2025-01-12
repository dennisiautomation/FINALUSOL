import React from 'react';

interface ProposalGeneratorHeaderProps {
  title: string;
}

export function ProposalGeneratorHeader({ title }: ProposalGeneratorHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
    </div>
  );
}