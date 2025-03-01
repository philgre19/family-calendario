
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import Dashboard from '@/pages/Dashboard';
import Tasks from '@/pages/Tasks';
import Calendar from '@/pages/Calendar';
import Stats from '@/pages/Stats';
import Settings from '@/pages/Settings';
import UserSettings from '@/pages/UserSettings';
import Weather from '@/pages/Weather';
import Auth from '@/pages/Auth';
import NotFound from '@/pages/NotFound';

// Composant pour les routes protégées
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Chargement...</div>;
  }
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  return <>{children}</>;
}

// Version non-protégée pour le routeur principal
function AppRoutes() {
  const { user, loading } = useAuth();

  // Rediriger vers le dashboard si déjà connecté
  if (user && window.location.pathname === '/auth') {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      
      {/* Routes protégées */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/tasks" element={
        <ProtectedRoute>
          <Tasks />
        </ProtectedRoute>
      } />
      <Route path="/calendar" element={
        <ProtectedRoute>
          <Calendar />
        </ProtectedRoute>
      } />
      <Route path="/stats" element={
        <ProtectedRoute>
          <Stats />
        </ProtectedRoute>
      } />
      <Route path="/settings" element={
        <ProtectedRoute>
          <Settings />
        </ProtectedRoute>
      } />
      <Route path="/user-settings" element={
        <ProtectedRoute>
          <UserSettings />
        </ProtectedRoute>
      } />
      <Route path="/weather" element={
        <ProtectedRoute>
          <Weather />
        </ProtectedRoute>
      } />
      
      {/* Redirection par défaut - maintenant pointe vers dashboard */}
      <Route path="/" element={<Navigate to={user ? "/dashboard" : "/auth"} replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
        <Toaster position="top-right" />
      </AuthProvider>
    </Router>
  );
}
