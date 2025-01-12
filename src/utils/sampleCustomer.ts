export const sampleCustomer = {
  name: "João Silva",
  documentType: "cpf",
  document: "123.456.789-00",
  email: "joao.silva@email.com",
  phone: "(11) 98765-4321",
  address: {
    street: "Rua das Flores",
    number: "123",
    complement: "Casa",
    neighborhood: "Centro",
    city: "São Paulo",
    state: "SP",
    zipCode: "01234-567"
  },
  consumptionInfo: {
    monthlyHistory: {
      "2024-01": 450,
      "2023-12": 480,
      "2023-11": 460,
      "2023-10": 440,
      "2023-09": 420,
      "2023-08": 430
    },
    tariffType: "residential",
    powerCompany: "enel",
    voltage: "220",
    averageConsumption: 450
  },
  installationInfo: {
    type: "roof",
    availableArea: 40,
    roofMaterial: "ceramic",
    roofOrientation: "north",
    roofInclination: 20
  },
  generationType: "individual"
};