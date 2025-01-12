export function validateCredentials(email: string, password: string): boolean {
  if (!email || !password) return false;
  
  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return false;
  
  // Password requirements
  if (password.length < 8) return false;
  
  return true;
}