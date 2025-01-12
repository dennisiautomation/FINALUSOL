-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create base tables
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'representative')),
  region TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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

CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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

CREATE TABLE IF NOT EXISTS public.proposals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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

CREATE TABLE IF NOT EXISTS public.proposal_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  proposal_id UUID NOT NULL REFERENCES proposals(id),
  product_id UUID NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposal_items ENABLE ROW LEVEL SECURITY;

-- Create admin check function
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 
    FROM users 
    WHERE id = auth.uid() 
    AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create RLS policies
CREATE POLICY "users_read_policy" ON users
  FOR SELECT TO authenticated
  USING (id = auth.uid() OR is_admin());

CREATE POLICY "users_update_policy" ON users
  FOR UPDATE TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

CREATE POLICY "users_admin_policy" ON users
  FOR ALL TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- Create initial admin user
INSERT INTO users (
  email,
  name,
  role,
  active
)
VALUES (
  'admin@usol.com.br',
  'Admin',
  'admin',
  true
)
ON CONFLICT (email) 
DO UPDATE SET
  role = 'admin',
  active = true,
  updated_at = now();

-- Drop existing indexes if they exist
DROP INDEX IF EXISTS idx_customers_representative;
DROP INDEX IF EXISTS idx_proposals_customer;
DROP INDEX IF EXISTS idx_proposals_representative;
DROP INDEX IF EXISTS idx_proposal_items_proposal;
DROP INDEX IF EXISTS idx_products_type;

-- Create new indexes
CREATE INDEX IF NOT EXISTS idx_customers_representative_new ON customers(representative_id);
CREATE INDEX IF NOT EXISTS idx_proposals_customer_new ON proposals(customer_id);
CREATE INDEX IF NOT EXISTS idx_proposals_representative_new ON proposals(representative_id);
CREATE INDEX IF NOT EXISTS idx_proposal_items_proposal_new ON proposal_items(proposal_id);
CREATE INDEX IF NOT EXISTS idx_products_type_new ON products(type);