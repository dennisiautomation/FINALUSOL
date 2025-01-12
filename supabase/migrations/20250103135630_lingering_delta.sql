-- Drop existing policies first
DROP POLICY IF EXISTS "user_read_policy" ON users;
DROP POLICY IF EXISTS "user_update_policy" ON users;
DROP POLICY IF EXISTS "admin_manage_policy" ON users;

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create tables if they don't exist
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

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

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

-- Create new policies with unique names
CREATE POLICY "read_policy_20250103"
  ON users
  FOR SELECT
  TO authenticated
  USING (
    id = auth.uid() OR 
    is_admin()
  );

CREATE POLICY "update_policy_20250103"
  ON users
  FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

CREATE POLICY "admin_policy_20250103"
  ON users
  FOR ALL
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- Create initial admin user
DO $$
DECLARE
  v_user_id UUID := gen_random_uuid();
BEGIN
  -- Insert admin user
  INSERT INTO users (
    id,
    email,
    name,
    role,
    active,
    created_at,
    updated_at
  )
  VALUES (
    v_user_id,
    'admin@usol.com.br',
    'Admin',
    'admin',
    true,
    NOW(),
    NOW()
  )
  ON CONFLICT (email) DO UPDATE
  SET
    role = 'admin',
    active = true,
    updated_at = NOW();
END $$;