import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import { useAuthStore } from './store/auth';
import { useProductsStore } from './store/products';
import { useCustomersStore } from './store/customers';

// Import ProposalPreview directly instead of lazy loading
import ProposalPreview from './pages/ProposalPreview';

// Lazy load other components
const Login = React.lazy(() => import('./pages/Login'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Representatives = React.lazy(() => import('./pages/Representatives'));
const Customers = React.lazy(() => import('./pages/Customers'));
const AdminCustomers = React.lazy(() => import('./pages/AdminCustomers'));
const AdminProposals = React.lazy(() => import('./pages/AdminProposals'));
const AdminUsers = React.lazy(() => import('./pages/AdminUsers'));
const Proposals = React.lazy(() => import('./pages/Proposals'));
const ProposalGenerator = React.lazy(() => import('./pages/ProposalGenerator'));
const ProposalEdit = React.lazy(() => import('./pages/ProposalEdit'));
const SolarCalculator = React.lazy(() => import('./pages/SolarCalculator'));
const Products = React.lazy(() => import('./pages/Products'));
const ProposalTemplates = React.lazy(() => import('./pages/ProposalTemplates'));
const ContractTemplates = React.lazy(() => import('./pages/ContractTemplates'));

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default function App() {
  const { initializeStore: initializeProducts } = useProductsStore();
  const { initializeStore: initializeCustomers } = useCustomersStore();

  // Initialize stores when app starts
  useEffect(() => {
    initializeProducts();
    initializeCustomers();
  }, [initializeProducts, initializeCustomers]);

  return (
    <BrowserRouter>
      <React.Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      }>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/preview" element={<ProposalPreview />} />
          
          <Route path="/" element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="representatives" element={<Representatives />} />
            <Route path="customers" element={<Customers />} />
            <Route path="admin/customers" element={<AdminCustomers />} />
            <Route path="admin/proposals" element={<AdminProposals />} />
            <Route path="admin/users" element={<AdminUsers />} />
            <Route path="proposals" element={<Proposals />} />
            <Route path="proposal/new" element={<ProposalGenerator />} />
            <Route path="proposal/edit/:id" element={<ProposalEdit />} />
            <Route path="calculator" element={<SolarCalculator />} />
            <Route path="products" element={<Products />} />
            <Route path="proposal-templates" element={<ProposalTemplates />} />
            <Route path="contracts" element={<ContractTemplates />} />
          </Route>
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
}