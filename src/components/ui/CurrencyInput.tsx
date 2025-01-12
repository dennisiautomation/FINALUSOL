import React from 'react';
import { Input } from './Input';

interface CurrencyInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  error?: string;
  value: number;
  onChange: (value: number) => void;
}

export function CurrencyInput({ label, error, value, onChange, ...props }: CurrencyInputProps) {
  // Format number to Brazilian currency string
  const formatToCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  // Parse currency string to number
  const parseCurrencyString = (value: string): number => {
    return Number(value.replace(/\D/g, '')) / 100;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '');
    const numberValue = parseCurrencyString(rawValue);
    onChange(numberValue);
  };

  return (
    <Input
      {...props}
      type="text"
      label={label}
      error={error}
      value={`R$ ${formatToCurrency(value)}`}
      onChange={handleChange}
      onFocus={(e) => e.target.select()}
    />
  );
}