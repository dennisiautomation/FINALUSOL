-- Drop existing policies and functions with CASCADE to handle dependencies
DROP POLICY IF EXISTS "Allow users to read own data and admins to read all" ON users CASCADE;
DROP POLICY IF EXISTS "Allow users to update own data" ON users CASCADE;
DROP POLICY IF EXISTS "Allow admins to insert users" ON users CASCADE;
DROP POLICY IF EXISTS "Allow admins to delete users" ON users CASCADE;
DROP FUNCTION IF EXISTS public.is_admin() CASCADE;

-- Create secure admin check function
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 
    FROM auth.users 
    WHERE id = auth.uid() 
    AND raw_user_meta_data->>'role' = 'admin'
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

-- Create initial admin user if it doesn't exist
DO $$
DECLARE
  admin_id UUID;
BEGIN
  -- First try to get existing admin user
  SELECT id INTO admin_id FROM auth.users WHERE email = 'admin@usol.com.br';

  -- If admin doesn't exist, create auth user
  IF admin_id IS NULL THEN
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
      updated_at
    )
    VALUES (
      '00000000-0000-0000-0000-000000000000',
      gen_random_uuid(),
      'authenticated',
      'authenticated',
      'admin@usol.com.br',
      crypt('admin123!@#', gen_salt('bf')),
      NOW(),
      jsonb_build_object('provider', 'email', 'providers', array['email']),
      jsonb_build_object('name', 'Admin', 'role', 'admin'),
      NOW(),
      NOW()
    )
    RETURNING id INTO admin_id;
  END IF;

  -- Create or update public profile
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
    admin_id,
    'admin@usol.com.br',
    'Admin',
    'admin',
    true,
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO UPDATE SET
    role = 'admin',
    active = true,
    updated_at = NOW();
END $$;