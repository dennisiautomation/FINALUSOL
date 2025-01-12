/*
  # Fix user policies and admin creation

  1. Changes
    - Drop existing policies
    - Create admin check function
    - Create new RLS policies
    - Add admin user safely
  
  2. Security
    - Enable RLS
    - Add proper policies for user management
*/

-- First drop all existing policies to start fresh
DROP POLICY IF EXISTS "Users can read own data" ON users;
DROP POLICY IF EXISTS "Users can update own data" ON users;
DROP POLICY IF EXISTS "Admins can insert users" ON users;
DROP POLICY IF EXISTS "Admins can delete users" ON users;
DROP POLICY IF EXISTS "Allow users to read own data and admins to read all" ON users;

-- Create a function to check if a user is an admin
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

-- Create new policies using the function
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

-- Create initial admin user if it doesn't exist
INSERT INTO public.users (
  id,
  email,
  name,
  role,
  active,
  created_at,
  updated_at
)
SELECT 
  gen_random_uuid(),
  'admin@usol.com.br',
  'Admin',
  'admin',
  true,
  NOW(),
  NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM public.users 
  WHERE email = 'admin@usol.com.br'
);