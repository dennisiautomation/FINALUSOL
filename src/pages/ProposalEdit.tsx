import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductSelector } from '../components/proposals/ProductSelector';
import { Button } from '../components/ui/Button';
import { useProposalsStore } from '../store/proposals';
import { useProductsStore } from '../store/products';
import { calculateTechnicalSummary } from '../utils/calculations/technical';
import { calculateFinancials } from '../utils/calculations/financials';
import { ENERGY_RATES } from '../config/solarConstants';

export default function ProposalEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { proposals, updateProposal } = useProposalsStore();
  const { products } = useProductsStore();
  const [selectedProducts, setSelectedProducts] = useState<Array<{ product: any; quantity: number }>>([]);

  const proposal = proposals.find(p => p.id === id);

  useEffect(() => {
    if (proposal) {
      setSelectedProducts(proposal.products);
    }
  }, [proposal]);

  if (!proposal) {
    return <div>Proposta não encontrada</div>;
  }

  const handleSave = () => {
    // Recalculate technical and financial data
    const technical = calculateTechnicalSummary(selectedProducts, 4.5);
    const financial = calculateFinancials({
      monthlyProduction: technical.monthlyProduction,
      energyRate: ENERGY_RATES[proposal.customer.address.state] || 0.85,
      totalInvestment: selectedProducts.reduce((sum, { product, quantity }) => 
        sum + (product.price * quantity), 0)
    });

    updateProposal(id!, {
      ...proposal,
      products: selectedProducts,
      technical,
      financial,
      totalValue: financial.totalInvestment,
      updatedAt: new Date()
    });
    navigate('/proposals');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Editar Proposta</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium mb-4">Equipamentos</h2>
        <ProductSelector
          products={products}
          selectedProducts={selectedProducts}
          onChange={setSelectedProducts}
        />
      </div>

      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={() => navigate('/proposals')}>
          Cancelar
        </Button>
        <Button onClick={handleSave}>
          Salvar Alterações
        </Button>
      </div>
    </div>
  );
}