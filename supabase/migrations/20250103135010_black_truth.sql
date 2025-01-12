-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing policies and functions
DROP POLICY IF EXISTS "Allow users to read own data and admins to read all" ON users CASCADE;
DROP POLICY IF EXISTS "Allow users to update own data" ON users CASCADE;
DROP POLICY IF EXISTS "Allow admins to insert users" ON users CASCADE;
DROP POLICY IF EXISTS "Allow admins to delete users" ON users CASCADE;
DROP FUNCTION IF EXISTS public.is_admin() CASCADE;

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

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow users to read own data and admins to read all"
  ON users
  FOR SELECT
  TO authenticated
  USING (
    id = auth.uid() OR 
    is_admin()
  );

CREATE POLICY "Allow users to update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

CREATE POLICY "Allow admins to insert users"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (
    is_admin() OR 
    auth.uid() = id
  );

CREATE POLICY "Allow admins to delete users"
  ON users
  FOR DELETE
  TO authenticated
  USING (is_admin());

-- Create initial admin user in public schema
INSERT INTO public.users (
  id,
  email,
  name,
  role,
  active,
  created_at,
  updated_at
)
VALUES (
  uuid_generate_v4(),
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