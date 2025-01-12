import React from 'react';
import { Input } from './Input';

interface DecimalInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  error?: string;
  value: number;
  onChange: (value: number) => void;
  precision?: number;
}

export function DecimalInput({ 
  label, 
  error, 
  value, 
  onChange, 
  precision = 3,
  ...props 
}: DecimalInputProps) {
  // Format number to string with specified precision
  const formatDecimal = (num: number): string => {
    return num.toLocaleString('pt-BR', {
      minimumFractionDigits: precision,
      maximumFractionDigits: precision,
    });
  };

  // Parse decimal string to number
  const parseDecimalString = (value: string): number => {
    const cleanValue = value.replace(/[^\d,]/g, '').replace(',', '.');
    return Number(cleanValue);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = parseDecimalString(e.target.value);
    if (!isNaN(parsed)) {
      onChange(parsed);
    }
  };

  return (
    <Input
      {...props}
      type="text"
      label={label}
      error={error}
      value={formatDecimal(value)}
      onChange={handleChange}
      onFocus={(e) => e.target.select()}
    />
  );
}