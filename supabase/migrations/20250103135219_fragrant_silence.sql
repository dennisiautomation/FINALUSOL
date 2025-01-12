-- Drop existing policies with CASCADE to handle dependencies
DROP POLICY IF EXISTS "Users can read own data or admins read all" ON users CASCADE;
DROP POLICY IF EXISTS "Users can update own profile" ON users CASCADE;
DROP POLICY IF EXISTS "Admins manage users" ON users CASCADE;
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

-- Create new policies with unique names
CREATE POLICY "user_read_policy"
  ON users
  FOR SELECT
  TO authenticated
  USING (
    id = auth.uid() OR 
    is_admin()
  );

CREATE POLICY "user_update_policy"
  ON users
  FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

CREATE POLICY "admin_manage_policy"
  ON users
  FOR ALL
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- Create initial admin user if not exists
INSERT INTO users (
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
  SELECT 1 FROM users 
  WHERE email = 'admin@usol.com.br'
);