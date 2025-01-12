import React from 'react';
import { Package, Upload } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { TemplateSelector } from './TemplateSelector';

interface ProductHeaderProps {
  onAddClick: () => void;
  onImportClick: () => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function ProductHeader({
  onAddClick,
  onImportClick,
  searchQuery,
  onSearchChange
}: ProductHeaderProps) {
  return (
    <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-center sm:space-y-0">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Catálogo de Produtos</h1>
      </div>

      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
        <Input
          type="search"
          placeholder="Buscar produtos..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full sm:w-64"
        />

        <div className="flex space-x-2">
          <Button onClick={onAddClick}>
            <Package className="h-5 w-5 mr-2" />
            Adicionar
          </Button>
          <Button variant="outline" onClick={onImportClick}>
            <Upload className="h-5 w-5 mr-2" />
            Importar
          </Button>
        </div>
      </div>

      <div className="mt-4 sm:mt-0">
        <TemplateSelector orientation="horizontal" />
      </div>
    </div>
  );
}