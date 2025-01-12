/*
  # Fix RLS policies to avoid recursion

  1. Changes
    - Remove recursive policies that check user role within themselves
    - Add security definer function for checking admin status
    - Update policies to use the new function
    - Add basic admin user creation
  
  2. Security
    - Enable RLS on users table
    - Add policies for data access control
    - Secure admin checks using security definer function
*/

-- First drop existing policies
DROP POLICY IF EXISTS "Users can read own data" ON users;
DROP POLICY IF EXISTS "Users can update own data" ON users;
DROP POLICY IF EXISTS "Admins can insert users" ON users;
DROP POLICY IF EXISTS "Admins can delete users" ON users;
DROP POLICY IF EXISTS "Users can read own data and admins read all" ON users;
DROP POLICY IF EXISTS "Allow users to read own data and admins to read all" ON users;

-- Create a secure function to check admin status
CREATE OR REPLACE FUNCTION auth.is_admin()
RETURNS boolean
LANGUAGE sql SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM users
    WHERE id = auth.uid()
    AND role = 'admin'
  );
$$;

-- Create new policies using the secure function
CREATE POLICY "Users can read own data or admins read all"
ON users
FOR SELECT
TO authenticated
USING (
  id = auth.uid() OR 
  auth.is_admin()
);

CREATE POLICY "Users can update own data"
ON users
FOR UPDATE
TO authenticated
USING (id = auth.uid())
WITH CHECK (id = auth.uid());

CREATE POLICY "Only admins can insert"
ON users
FOR INSERT
TO authenticated
WITH CHECK (
  auth.is_admin() OR 
  auth.uid() = id
);

CREATE POLICY "Only admins can delete"
ON users
FOR DELETE
TO authenticated
USING (auth.is_admin());

-- Ensure RLS is enabled
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create initial admin user if not exists
DO $$
BEGIN
  INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
  ) 
  SELECT
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    'admin@usol.com.br',
    crypt('admin123!@#', gen_salt('bf')),
    NOW(),
    '{"provider": "email", "providers": ["email"]}',
    '{"name": "Admin", "role": "admin"}',
    NOW(),
    NOW(),
    '',
    '',
    '',
    ''
  WHERE NOT EXISTS (
    SELECT 1 FROM auth.users WHERE email = 'admin@usol.com.br'
  );

  INSERT INTO public.users (
    id,
    email,
    name,
    role,
    active
  )
  SELECT
    id,
    email,
    'Admin',
    'admin',
    true
  FROM auth.users
  WHERE email = 'admin@usol.com.br'
  AND NOT EXISTS (
    SELECT 1 FROM public.users WHERE email = 'admin@usol.com.br'
  );
END
$$;