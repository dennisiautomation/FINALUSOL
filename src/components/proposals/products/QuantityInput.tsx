import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';

interface QuantityInputProps {
  quantity: number;
  onChange: (value: number) => void;
}

export function QuantityInput({ quantity, onChange }: QuantityInputProps) {
  const [inputValue, setInputValue] = useState(quantity.toString());

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    // Only update if there's a valid number
    if (value !== '') {
      const newValue = parseInt(value);
      if (!isNaN(newValue) && newValue >= 0) {
        onChange(newValue);
      }
    }
  };

  // Update local input value when quantity prop changes
  React.useEffect(() => {
    setInputValue(quantity.toString());
  }, [quantity]);

  // Handle blur to restore last valid value if input is empty
  const handleBlur = () => {
    if (inputValue === '') {
      setInputValue(quantity.toString());
    }
  };

  return (
    <div className="flex items-center space-x-3">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onChange(Math.max(1, quantity - 1))}
      >
        <Minus className="h-4 w-4" />
      </Button>
      <Input
        type="number"
        min="1"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleBlur}
        className="w-20 text-center"
      />
      <Button
        variant="outline"
        size="sm"
        onClick={() => onChange(quantity + 1)}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}