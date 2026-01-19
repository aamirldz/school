/**
 * NVRSS ERP - Main Application
 * Root component with routing configuration
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Pages
import Login from './pages/Login';
import ChangePassword from './pages/ChangePassword';
import AdmissionForm from './pages/public/AdmissionForm';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import Admissions from './pages/admin/Admissions';
import Students from './pages/admin/Students';
import Users from './pages/admin/Users';

// Layouts
import DashboardLayout from './layouts/DashboardLayout';

// Styles
import './styles/design-system.css';

// Protected Route Component
function ProtectedRoute({
  children,
  allowedRoles
}: {
  children: React.ReactNode;
  allowedRoles?: string[];
}) {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="spinner spinner-lg"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.mustChangePassword) {
    return <Navigate to="/change-password" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}

// Unauthorized Page
function Unauthorized() {
  const { logout } = useAuth();

  return (
    <div className="error-page">
      <div className="error-content">
        <h1>403</h1>
        <h2>Access Denied</h2>
        <p>You don't have permission to access this page.</p>
        <button className="btn btn-primary" onClick={logout}>
          Sign Out
        </button>
      </div>
      <style>{`
        .error-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-body);
        }
        .error-content {
          text-align: center;
        }
        .error-content h1 {
          font-size: 6rem;
          font-weight: 700;
          color: var(--color-error-500);
          margin-bottom: 0;
          line-height: 1;
        }
        .error-content h2 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }
        .error-content p {
          color: var(--text-secondary);
          margin-bottom: 2rem;
        }
      `}</style>
    </div>
  );
}

// Not Found Page
function NotFound() {
  return (
    <div className="error-page">
      <div className="error-content">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you're looking for doesn't exist.</p>
        <a href="/" className="btn btn-primary">Go Home</a>
      </div>
      <style>{`
        .error-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-body);
        }
        .error-content {
          text-align: center;
        }
        .error-content h1 {
          font-size: 6rem;
          font-weight: 700;
          color: var(--color-primary-500);
          margin-bottom: 0;
          line-height: 1;
        }
        .error-content h2 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }
        .error-content p {
          color: var(--text-secondary);
          margin-bottom: 2rem;
        }
      `}</style>
    </div>
  );
}

// App Routes
function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/admission" element={<AdmissionForm />} />
      <Route path="/change-password" element={<ChangePassword />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Admin Dashboard Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['admin', 'admission_staff']}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="admissions" element={<Admissions />} />
        <Route
          path="students"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Students />
            </ProtectedRoute>
          }
        />
        <Route
          path="users"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Users />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Root redirect */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

// Main App Component
export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
