import React from 'react';

interface PreviewFooterProps {
  validityDays: number;
}

export function PreviewFooter({ validityDays }: PreviewFooterProps) {
  return (
    <div className="bg-gray-50 p-8 text-center text-sm text-gray-600">
      <p>
        Proposta válida até {
          new Date(Date.now() + validityDays * 24 * 60 * 60 * 1000).toLocaleDateString()
        }
      </p>
      <p className="mt-2">
        © {new Date().getFullYear()} U-sol Energia Solar. Todos os direitos reservados.
      </p>
    </div>
  );
}