export interface RepresentativeAddress {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface Representative {
  id: string;
  name: string;
  email: string;
  password?: string;
  cpf: string;
  rg: string;
  phone: string;
  address: RepresentativeAddress;
  region: string;
  active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}