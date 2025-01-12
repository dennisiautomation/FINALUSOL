-- Drop existing tables
DROP TABLE IF EXISTS proposal_items;
DROP TABLE IF EXISTS proposals;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS customers;

-- Create customers table with proper JSON columns
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  representative_id UUID NOT NULL REFERENCES profiles(id),
  name TEXT NOT NULL,
  document_type TEXT NOT NULL CHECK (document_type IN ('cpf', 'cnpj')),
  document TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address JSONB NOT NULL,
  consumption_info JSONB NOT NULL,
  installation_info JSONB NOT NULL,
  generation_type TEXT NOT NULL CHECK (generation_type IN ('individual', 'shared', 'remote')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create products table with specifications as JSONB
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type TEXT NOT NULL,
  model TEXT NOT NULL,
  manufacturer TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  warranty INTEGER NOT NULL,
  specifications JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  created_by UUID REFERENCES profiles(id)
);

-- Create proposals table
CREATE TABLE proposals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID NOT NULL REFERENCES customers(id),
  representative_id UUID NOT NULL REFERENCES profiles(id),
  status TEXT NOT NULL CHECK (status IN ('draft', 'sent', 'pending_financing', 'accepted', 'completed', 'rejected')),
  technical_data JSONB NOT NULL,
  financial_data JSONB NOT NULL,
  total_value DECIMAL(10,2) NOT NULL,
  validity_days INTEGER NOT NULL DEFAULT 30,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create proposal items table
CREATE TABLE proposal_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  proposal_id UUID NOT NULL REFERENCES proposals(id),
  product_id UUID NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposal_items ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "customers_access_policy" ON customers
  FOR ALL TO authenticated
  USING (
    representative_id = auth.uid() OR 
    EXISTS (SELECT 1 FROM profiles WHERE auth_id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "products_access_policy" ON products
  FOR ALL TO authenticated
  USING (true);

CREATE POLICY "proposals_access_policy" ON proposals
  FOR ALL TO authenticated
  USING (
    representative_id = auth.uid() OR 
    EXISTS (SELECT 1 FROM profiles WHERE auth_id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "proposal_items_access_policy" ON proposal_items
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM proposals 
      WHERE proposals.id = proposal_items.proposal_id 
      AND (
        proposals.representative_id = auth.uid() OR
        EXISTS (SELECT 1 FROM profiles WHERE auth_id = auth.uid() AND role = 'admin')
      )
    )
  );

-- Create indexes
CREATE INDEX idx_customers_representative ON customers(representative_id);
CREATE INDEX idx_proposals_customer ON proposals(customer_id);
CREATE INDEX idx_proposals_representative ON proposals(representative_id);
CREATE INDEX idx_proposal_items_proposal ON proposal_items(proposal_id);
CREATE INDEX idx_products_type ON products(type);