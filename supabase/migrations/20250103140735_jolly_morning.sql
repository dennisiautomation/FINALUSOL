-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Drop existing tables and functions to start fresh
DROP TABLE IF EXISTS public.profiles CASCADE;
DROP FUNCTION IF EXISTS public.is_admin() CASCADE;

-- Create profiles table with proper structure
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'representative')),
  region TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT fk_auth_user FOREIGN KEY (auth_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create admin check function
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 
    FROM public.profiles 
    WHERE auth_id = auth.uid() 
    AND role = 'admin'
    AND active = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create RLS policies with unique names
CREATE POLICY "profiles_select_20250103_v3"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (
    auth_id = auth.uid() OR 
    is_admin()
  );

CREATE POLICY "profiles_update_20250103_v3"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (auth_id = auth.uid())
  WITH CHECK (auth_id = auth.uid());

CREATE POLICY "profiles_admin_20250103_v3"
  ON public.profiles
  FOR ALL
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- Create indexes
CREATE INDEX idx_profiles_auth_id_v3 ON profiles(auth_id);
CREATE INDEX idx_profiles_role_v3 ON profiles(role);
CREATE INDEX idx_profiles_email_v3 ON profiles(email);

-- Create initial admin user
DO $$
DECLARE
  v_auth_id UUID;
BEGIN
  -- Create auth user if not exists
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
  SELECT
    '00000000-0000-0000-0000-000000000000',
    uuid_generate_v4(),
    'authenticated',
    'authenticated',
    'admin@usol.com.br',
    crypt('admin123!@#', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{"name":"Admin","role":"admin"}',
    now(),
    now()
  WHERE NOT EXISTS (
    SELECT 1 FROM auth.users WHERE email = 'admin@usol.com.br'
  )
  RETURNING id INTO v_auth_id;

  -- Get auth_id if it wasn't just created
  IF v_auth_id IS NULL THEN
    SELECT id INTO v_auth_id FROM auth.users WHERE email = 'admin@usol.com.br';
  END IF;

  -- Create admin profile
  INSERT INTO public.profiles (
    auth_id,
    email,
    name,
    role,
    active
  )
  VALUES (
    v_auth_id,
    'admin@usol.com.br',
    'Admin',
    'admin',
    true
  )
  ON CONFLICT (email) DO UPDATE 
  SET 
    auth_id = EXCLUDED.auth_id,
    role = 'admin',
    active = true,
    updated_at = now();

  -- Grant necessary permissions
  GRANT USAGE ON SCHEMA public TO authenticated;
  GRANT ALL ON public.profiles TO authenticated;
  GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO authenticated;
END $$;

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();