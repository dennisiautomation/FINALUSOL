import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
}

export function NavLink({ to, children }: NavLinkProps) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`inline-flex items-center px-3 py-2 text-sm font-medium border-b-2 ${
        isActive
          ? 'border-white text-white'
          : 'border-transparent text-gray-100 hover:text-white hover:border-gray-200'
      }`}
    >
      {children}
    </Link>
  );
}