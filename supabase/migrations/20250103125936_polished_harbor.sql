/*
  # Initial Schema Setup

  1. New Tables
    - users (admins and representatives)
    - customers
    - products
    - proposals
    - proposal_items
    - templates

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Set up proper role-based access
*/

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'representative')),
  region TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Admins can manage all users"
  ON users
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
  ));

-- Customers table
CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  representative_id UUID NOT NULL REFERENCES users(id),
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

ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own customers"
  ON customers
  FOR SELECT
  TO authenticated
  USING (
    representative_id = auth.uid() OR 
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Representatives can manage their customers"
  ON customers
  USING (representative_id = auth.uid());

CREATE POLICY "Admins can manage all customers"
  ON customers
  USING (EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
  ));

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL,
  model TEXT NOT NULL,
  manufacturer TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  warranty INTEGER NOT NULL,
  specifications JSONB,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  created_by UUID REFERENCES users(id)
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Products are readable by all authenticated users"
  ON products
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Only admins can manage products"
  ON products
  USING (EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
  ));

-- Proposals table
CREATE TABLE IF NOT EXISTS proposals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES customers(id),
  representative_id UUID NOT NULL REFERENCES users(id),
  status TEXT NOT NULL CHECK (status IN ('draft', 'sent', 'pending_financing', 'accepted', 'completed', 'rejected')),
  technical_data JSONB NOT NULL,
  financial_data JSONB NOT NULL,
  total_value DECIMAL(10,2) NOT NULL,
  validity_days INTEGER NOT NULL DEFAULT 30,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own proposals"
  ON proposals
  FOR SELECT
  TO authenticated
  USING (
    representative_id = auth.uid() OR 
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Representatives can manage their proposals"
  ON proposals
  USING (representative_id = auth.uid());

CREATE POLICY "Admins can manage all proposals"
  ON proposals
  USING (EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- Proposal items table
CREATE TABLE IF NOT EXISTS proposal_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  proposal_id UUID NOT NULL REFERENCES proposals(id),
  product_id UUID NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE proposal_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own proposal items"
  ON proposal_items
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM proposals 
    WHERE proposals.id = proposal_items.proposal_id 
    AND (proposals.representative_id = auth.uid() 
    OR EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'))
  ));

CREATE POLICY "Representatives can manage their proposal items"
  ON proposal_items
  USING (EXISTS (
    SELECT 1 FROM proposals 
    WHERE proposals.id = proposal_items.proposal_id 
    AND proposals.representative_id = auth.uid()
  ));

CREATE POLICY "Admins can manage all proposal items"
  ON proposal_items
  USING (EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
  ));

-- Templates table
CREATE TABLE IF NOT EXISTS templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  content JSONB NOT NULL,
  is_active BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Templates are readable by all authenticated users"
  ON templates
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Only admins can manage templates"
  ON templates
  USING (EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
  ));

-- Create indexes for better performance
CREATE INDEX idx_customers_representative ON customers(representative_id);
CREATE INDEX idx_proposals_customer ON proposals(customer_id);
CREATE INDEX idx_proposals_representative ON proposals(representative_id);
CREATE INDEX idx_proposal_items_proposal ON proposal_items(proposal_id);
CREATE INDEX idx_products_type ON products(type);