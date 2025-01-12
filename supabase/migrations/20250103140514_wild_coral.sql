-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Drop existing profiles table if exists
DROP TABLE IF EXISTS public.profiles CASCADE;

-- Create profiles table with proper structure
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_id UUID UNIQUE REFERENCES auth.users(id),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'representative')),
  region TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "profiles_select_policy"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (
    auth_id = auth.uid() OR 
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE auth_id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "profiles_update_policy"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (auth_id = auth.uid())
  WITH CHECK (auth_id = auth.uid());

CREATE POLICY "profiles_admin_policy"
  ON public.profiles
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE auth_id = auth.uid() AND role = 'admin'
    )
  );

-- Create indexes
CREATE INDEX idx_profiles_auth_id ON profiles(auth_id);
CREATE INDEX idx_profiles_role ON profiles(role);

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
    auth_id = v_auth_id,
    role = 'admin',
    active = true,
    updated_at = now();
END $$;