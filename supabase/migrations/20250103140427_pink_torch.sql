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

-- Drop existing policies if any
DROP POLICY IF EXISTS "Profiles are viewable by users who created them or admins" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can manage all profiles" ON public.profiles;

-- Create RLS policies
CREATE POLICY "Profiles are viewable by users who created them or admins"
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

CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (auth_id = auth.uid())
  WITH CHECK (auth_id = auth.uid());

CREATE POLICY "Admins can manage all profiles"
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
CREATE INDEX IF NOT EXISTS idx_profiles_auth_id ON profiles(auth_id);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);

-- Create initial admin user if not exists
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

  -- Create admin profile
  INSERT INTO public.profiles (
    auth_id,
    email,
    name,
    role,
    active
  )
  VALUES (
    COALESCE(v_auth_id, (SELECT id FROM auth.users WHERE email = 'admin@usol.com.br')),
    'admin@usol.com.br',
    'Admin',
    'admin',
    true
  )
  ON CONFLICT (email) DO UPDATE 
  SET 
    role = 'admin',
    active = true,
    updated_at = now();
END $$;