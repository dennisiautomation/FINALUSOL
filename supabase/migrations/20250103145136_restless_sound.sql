-- Drop existing customers table
DROP TABLE IF EXISTS customers CASCADE;

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

-- Enable RLS
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "customers_select_policy"
  ON customers
  FOR SELECT
  TO authenticated
  USING (
    representative_id = auth.uid() OR 
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE auth_id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "customers_insert_policy"
  ON customers
  FOR INSERT
  TO authenticated
  WITH CHECK (
    representative_id = auth.uid() OR 
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE auth_id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "customers_update_policy"
  ON customers
  FOR UPDATE
  TO authenticated
  USING (
    representative_id = auth.uid() OR 
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE auth_id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "customers_delete_policy"
  ON customers
  FOR DELETE
  TO authenticated
  USING (
    representative_id = auth.uid() OR 
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE auth_id = auth.uid() AND role = 'admin'
    )
  );

-- Create indexes
CREATE INDEX idx_customers_representative ON customers(representative_id);