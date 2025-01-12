import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { CustomerSelector } from '../components/proposals/CustomerSelector';
import { ProductSelector } from '../components/proposals/ProductSelector';
import { AutomaticProductSelector } from '../components/proposals/AutomaticProductSelector';
import { useCustomersStore } from '../store/customers';
import { useProductsStore } from '../store/products';
import { useAuthStore } from '../store/auth';
import { useProposalsStore } from '../store/proposals';
import { Product } from '../types';
import { calculateTechnicalSummary } from '../utils/calculations/technical';
import { calculateFinancials } from '../utils/calculations/financials';
import { ENERGY_RATES } from '../config/solarConstants';
import { getSolarIrradiation } from '../services/solarApi';
import { GeocodingService } from '../services/GeocodingService';

export default function ProposalGenerator() {
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>('');
  const [isManualSelection, setIsManualSelection] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<Array<{ product: Product; quantity: number }>>([]);
  const navigate = useNavigate();
  const geocodingService = new GeocodingService();

  const { user } = useAuthStore();
  const { customers } = useCustomersStore();
  const { products } = useProductsStore();
  const { addProposal } = useProposalsStore();

  const availableCustomers = user?.role === 'admin' 
    ? customers 
    : customers.filter(c => c.representativeId === user?.id);

  const selectedCustomer = customers.find(c => c.id === selectedCustomerId);

  const handleGenerateProposal = async () => {
    if (!selectedCustomer || selectedProducts.length === 0 || !user) return;

    try {
      // Get coordinates for the customer's location
      const locationWithCoords = await geocodingService.getCoordinates(selectedCustomer.address);
      
      // Get solar irradiation data for the location
      const irradiation = locationWithCoords.latitude && locationWithCoords.longitude
        ? await getSolarIrradiation(locationWithCoords.latitude, locationWithCoords.longitude)
        : undefined;

      // Calculate technical summary with location-specific irradiation
      const technical = calculateTechnicalSummary(selectedProducts, irradiation);

      // Get state-specific energy rate
      const energyRate = ENERGY_RATES[selectedCustomer.address.state] || 0.85;

      // Calculate financial analysis
      const financial = calculateFinancials({
        monthlyProduction: technical.monthlyProduction,
        energyRate,
        totalInvestment: selectedProducts.reduce((sum, { product, quantity }) => 
          sum + (product.price * quantity), 0)
      });

      // Create proposal data
      const proposalData = {
        id: Math.random().toString(36).substr(2, 9),
        customerId: selectedCustomer.id,
        representativeId: user.id,
        customer: selectedCustomer,
        products: selectedProducts,
        technical,
        financial,
        status: 'draft' as const,
        totalValue: financial.totalInvestment,
        date: new Date(),
        validityDays: 30,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      // Save proposal
      addProposal(proposalData);

      // Navigate to preview
      navigate('/preview', { state: proposalData });
    } catch (error) {
      console.error('Error generating proposal:', error);
      // Handle error appropriately
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Nova Proposta</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Selection */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium mb-4">Selecione o Cliente</h2>
          <CustomerSelector
            customers={availableCustomers}
            selectedId={selectedCustomerId}
            onSelect={setSelectedCustomerId}
          />
        </div>

        {/* Product Selection */}
        {selectedCustomer && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Seleção de Produtos</h2>
              <Button variant="outline" onClick={() => setIsManualSelection(!isManualSelection)}>
                {isManualSelection ? 'Usar Recomendação' : 'Seleção Manual'}
              </Button>
            </div>

            {isManualSelection ? (
              <ProductSelector
                products={products}
                selectedProducts={selectedProducts}
                onChange={setSelectedProducts}
              />
            ) : (
              <AutomaticProductSelector
                customer={selectedCustomer}
                products={products}
                onProductsSelect={setSelectedProducts}
                onSwitchToManual={() => setIsManualSelection(true)}
              />
            )}
          </div>
        )}
      </div>

      {selectedCustomer && selectedProducts.length > 0 && (
        <div className="flex justify-end">
          <Button onClick={handleGenerateProposal}>
            Visualizar Proposta
          </Button>
        </div>
      )}
    </div>
  );
}