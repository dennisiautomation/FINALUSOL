import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  UserPlus, 
  FileText, 
  Calculator, 
  LogOut,
  Home,
  Package,
  Menu,
  X,
  Shield
} from 'lucide-react';
import { User } from '../../types';
import { NavLink } from './NavLink';
import { Logo } from '../Logo';

interface NavigationProps {
  user: User | null;
  onLogout: () => void;
}

export default function Navigation({ user, onLogout }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAdmin = user?.role === 'admin';

  const commonLinks = [
    {
      to: "/",
      icon: <Home className="h-5 w-5 mr-1" />,
      label: "Painel"
    },
    {
      to: "/customers",
      icon: <UserPlus className="h-5 w-5 mr-1" />,
      label: "Clientes"
    },
    {
      to: "/proposals",
      icon: <FileText className="h-5 w-5 mr-1" />,
      label: "Propostas"
    },
    {
      to: "/proposal/new",
      icon: <FileText className="h-5 w-5 mr-1" />,
      label: "Nova Proposta"
    },
    {
      to: "/calculator",
      icon: <Calculator className="h-5 w-5 mr-1" />,
      label: "Calculadora Solar"
    }
  ];

  const adminLinks = [
    {
      to: "/products",
      icon: <Package className="h-5 w-5 mr-1" />,
      label: "Produtos"
    },
    {
      to: "/representatives",
      icon: <Users className="h-5 w-5 mr-1" />,
      label: "Representantes"
    },
    {
      to: "/admin/users",
      icon: <Shield className="h-5 w-5 mr-1" />,
      label: "Administradores"
    }
  ];

  const links = isAdmin ? [...commonLinks, ...adminLinks] : commonLinks;

  return (
    <nav className="relative bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Logo className="h-8 w-auto" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {links.map(link => (
              <NavLink key={link.to} to={link.to}>
                {link.icon}
                {link.label}
              </NavLink>
            ))}
            <button
              onClick={onLogout}
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-white hover:text-gray-200 hover:bg-gray-700"
            >
              <LogOut className="h-5 w-5 mr-1" />
              Sair
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-200 hover:bg-gray-700"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-800">
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-white hover:text-gray-200 hover:bg-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
          <button
            onClick={() => {
              setIsMenuOpen(false);
              onLogout();
            }}
            className="w-full flex items-center px-3 py-2 rounded-md text-sm font-medium text-white hover:text-gray-200 hover:bg-gray-700"
          >
            <LogOut className="h-5 w-5 mr-1" />
            Sair
          </button>
        </div>
      </div>
    </nav>
  );
}