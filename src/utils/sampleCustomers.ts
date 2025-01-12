import { Customer } from '../types';

export const sampleCustomers: Partial<Customer>[] = [
  {
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
  },
  {
    name: "Maria Santos",
    documentType: "cpf",
    document: "987.654.321-00",
    email: "maria.santos@email.com",
    phone: "(11) 91234-5678",
    address: {
      street: "Avenida Paulista",
      number: "1000",
      complement: "Apto 501",
      neighborhood: "Bela Vista",
      city: "São Paulo",
      state: "SP",
      zipCode: "01310-100"
    },
    consumptionInfo: {
      monthlyHistory: {
        "2024-01": 280,
        "2023-12": 300,
        "2023-11": 290,
        "2023-10": 285,
        "2023-09": 275,
        "2023-08": 280
      },
      tariffType: "residential",
      powerCompany: "enel",
      voltage: "220",
      averageConsumption: 285
    },
    installationInfo: {
      type: "roof",
      availableArea: 25,
      roofMaterial: "metallic",
      roofOrientation: "west",
      roofInclination: 15
    },
    generationType: "individual"
  },
  {
    name: "Supermercado Bom Preço",
    documentType: "cnpj",
    document: "12.345.678/0001-90",
    email: "contato@bompreco.com",
    phone: "(11) 3333-4444",
    address: {
      street: "Rua do Comércio",
      number: "500",
      neighborhood: "Centro",
      city: "Campinas",
      state: "SP",
      zipCode: "13015-080"
    },
    consumptionInfo: {
      monthlyHistory: {
        "2024-01": 3500,
        "2023-12": 3800,
        "2023-11": 3600,
        "2023-10": 3400,
        "2023-09": 3300,
        "2023-08": 3450
      },
      tariffType: "commercial",
      powerCompany: "cpfl",
      voltage: "380",
      averageConsumption: 3508
    },
    installationInfo: {
      type: "roof",
      availableArea: 500,
      roofMaterial: "metallic",
      roofOrientation: "north",
      roofInclination: 5
    },
    generationType: "individual"
  },
  {
    name: "Fazenda São João",
    documentType: "cnpj",
    document: "98.765.432/0001-10",
    email: "fazenda@saojoao.com",
    phone: "(19) 99999-8888",
    address: {
      street: "Estrada Rural",
      number: "s/n",
      neighborhood: "Zona Rural",
      city: "Piracicaba",
      state: "SP",
      zipCode: "13420-000"
    },
    consumptionInfo: {
      monthlyHistory: {
        "2024-01": 2800,
        "2023-12": 3000,
        "2023-11": 2900,
        "2023-10": 2750,
        "2023-09": 2650,
        "2023-08": 2700
      },
      tariffType: "rural",
      powerCompany: "cpfl",
      voltage: "380",
      averageConsumption: 2800
    },
    installationInfo: {
      type: "ground",
      availableArea: 2000,
    },
    generationType: "remote"
  },
  {
    name: "Indústria Metalúrgica Silva",
    documentType: "cnpj",
    document: "11.222.333/0001-44",
    email: "industria@metalsilva.com",
    phone: "(11) 4444-5555",
    address: {
      street: "Avenida Industrial",
      number: "1500",
      neighborhood: "Distrito Industrial",
      city: "Guarulhos",
      state: "SP",
      zipCode: "07224-000"
    },
    consumptionInfo: {
      monthlyHistory: {
        "2024-01": 15000,
        "2023-12": 16000,
        "2023-11": 15500,
        "2023-10": 14800,
        "2023-09": 14500,
        "2023-08": 14700
      },
      tariffType: "industrial",
      powerCompany: "enel",
      voltage: "380",
      averageConsumption: 15083
    },
    installationInfo: {
      type: "roof",
      availableArea: 2000,
      roofMaterial: "metallic",
      roofOrientation: "north",
      roofInclination: 10
    },
    generationType: "individual"
  },
  {
    name: "Condomínio Solar Verde",
    documentType: "cnpj",
    document: "33.444.555/0001-66",
    email: "adm@solarverde.com",
    phone: "(11) 5555-6666",
    address: {
      street: "Rua das Árvores",
      number: "100",
      neighborhood: "Jardim Europa",
      city: "São Paulo",
      state: "SP",
      zipCode: "04567-000"
    },
    consumptionInfo: {
      monthlyHistory: {
        "2024-01": 5500,
        "2023-12": 5800,
        "2023-11": 5600,
        "2023-10": 5400,
        "2023-09": 5300,
        "2023-08": 5450
      },
      tariffType: "residential",
      powerCompany: "enel",
      voltage: "380",
      averageConsumption: 5508
    },
    installationInfo: {
      type: "ground",
      availableArea: 1000
    },
    generationType: "shared"
  },
  {
    name: "Pedro Oliveira",
    documentType: "cpf",
    document: "111.222.333-44",
    email: "pedro.oliveira@email.com",
    phone: "(11) 97777-8888",
    address: {
      street: "Rua dos Pinheiros",
      number: "250",
      complement: "Casa",
      neighborhood: "Pinheiros",
      city: "São Paulo",
      state: "SP",
      zipCode: "05422-000"
    },
    consumptionInfo: {
      monthlyHistory: {
        "2024-01": 650,
        "2023-12": 680,
        "2023-11": 660,
        "2023-10": 640,
        "2023-09": 620,
        "2023-08": 630
      },
      tariffType: "residential",
      powerCompany: "enel",
      voltage: "220",
      averageConsumption: 647
    },
    installationInfo: {
      type: "roof",
      availableArea: 60,
      roofMaterial: "fiber_cement",
      roofOrientation: "east",
      roofInclination: 25
    },
    generationType: "individual"
  },
  {
    name: "Shopping Center Plaza",
    documentType: "cnpj",
    document: "55.666.777/0001-88",
    email: "energia@shoppingplaza.com",
    phone: "(11) 6666-7777",
    address: {
      street: "Avenida Shopping",
      number: "2000",
      neighborhood: "Centro",
      city: "Santo André",
      state: "SP",
      zipCode: "09111-000"
    },
    consumptionInfo: {
      monthlyHistory: {
        "2024-01": 25000,
        "2023-12": 26000,
        "2023-11": 25500,
        "2023-10": 24800,
        "2023-09": 24500,
        "2023-08": 24700
      },
      tariffType: "commercial",
      powerCompany: "enel",
      voltage: "380",
      averageConsumption: 25083
    },
    installationInfo: {
      type: "roof",
      availableArea: 3000,
      roofMaterial: "metallic",
      roofOrientation: "north",
      roofInclination: 5
    },
    generationType: "individual"
  },
  {
    name: "Escola Futuro Brilhante",
    documentType: "cnpj",
    document: "77.888.999/0001-00",
    email: "contato@futurobrilhante.edu.br",
    phone: "(11) 7777-8888",
    address: {
      street: "Rua da Educação",
      number: "300",
      neighborhood: "Vila Mariana",
      city: "São Paulo",
      state: "SP",
      zipCode: "04044-000"
    },
    consumptionInfo: {
      monthlyHistory: {
        "2024-01": 4200,
        "2023-12": 4500,
        "2023-11": 4300,
        "2023-10": 4100,
        "2023-09": 4000,
        "2023-08": 4150
      },
      tariffType: "commercial",
      powerCompany: "enel",
      voltage: "380",
      averageConsumption: 4208
    },
    installationInfo: {
      type: "roof",
      availableArea: 800,
      roofMaterial: "ceramic",
      roofOrientation: "west",
      roofInclination: 15
    },
    generationType: "individual"
  },
  {
    name: "Ana Beatriz Costa",
    documentType: "cpf",
    document: "444.555.666-77",
    email: "ana.costa@email.com",
    phone: "(11) 98888-9999",
    address: {
      street: "Alameda Santos",
      number: "800",
      complement: "Apto 1502",
      neighborhood: "Jardins",
      city: "São Paulo",
      state: "SP",
      zipCode: "01419-000"
    },
    consumptionInfo: {
      monthlyHistory: {
        "2024-01": 380,
        "2023-12": 400,
        "2023-11": 390,
        "2023-10": 385,
        "2023-09": 375,
        "2023-08": 380
      },
      tariffType: "residential",
      powerCompany: "enel",
      voltage: "220",
      averageConsumption: 385
    },
    installationInfo: {
      type: "roof",
      availableArea: 30,
      roofMaterial: "ceramic",
      roofOrientation: "south",
      roofInclination: 18
    },
    generationType: "individual"
  }
];