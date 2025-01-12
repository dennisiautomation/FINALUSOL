export const SAMPLE_DATA = {
  customer: {
    name: "João Silva",
    email: "joao@email.com",
    phone: "(11) 98765-4321",
    address: {
      street: "Rua das Flores",
      number: "123",
      city: "São Paulo",
      state: "SP"
    },
    consumptionInfo: {
      averageConsumption: 500,
      energyRate: 0.85
    }
  },
  technical: {
    totalPower: 4.8,
    monthlyProduction: 600,
    requiredArea: 32,
    roofWeight: 450
  },
  financial: {
    monthlySavings: 425,
    annualSavings: 5100,
    estimatedPayback: 4.2,
    totalInvestment: 21420
  },
  products: [
    {
      product: {
        name: "Painel Solar 550W",
        manufacturer: "Canadian Solar",
        model: "HiKu CS6L-550MS",
        price: 1200
      },
      quantity: 8
    },
    {
      product: {
        name: "Inversor 5kW",
        manufacturer: "Growatt",
        model: "MIN 5000TL-X",
        price: 4500
      },
      quantity: 1
    }
  ],
  validityDays: 10
};