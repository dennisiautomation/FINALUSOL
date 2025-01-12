export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: 'admin' | 'representative';
  region?: string;
  active: boolean;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  consumption: number;
  representativeId: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  specifications: Record<string, string>;
}

export interface Proposal {
  id: string;
  customerId: string;
  representativeId: string;
  products: Array<{
    productId: string;
    quantity: number;
  }>;
  totalValue: number;
  status: 'draft' | 'sent' | 'accepted' | 'rejected';
  createdAt: Date;
  validUntil: Date;
}

export interface ProposalTemplate {
  id: string;
  name: string;
  description: string;
  header: {
    logo?: string;
    companyName: string;
    address?: string;
    phone?: string;
    email?: string;
  };
  sections: Array<{
    id: string;
    type: 'text' | 'products' | 'terms' | 'signature';
    order: number;
    title?: string;
    content?: string;
  }>;
  footer: {
    text: string;
    includeSignature: boolean;
  };
  styling: {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
    fontSize: string;
  };
}

export interface ContractTemplate {
  id: string;
  name: string;
  description: string;
  content: string;
  variables: Array<{
    key: string;
    label: string;
    type: 'text' | 'number' | 'date' | 'boolean';
    required: boolean;
  }>;
  sections: Array<{
    id: string;
    title: string;
    content: string;
    order: number;
    required: boolean;
  }>;
  styling: {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
    fontSize: string;
  };
  footer: {
    text: string;
    includeSignature: boolean;
    signatureFields: Array<{
      label: string;
      role: 'customer' | 'representative' | 'witness';
      required: boolean;
    }>;
  };
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}