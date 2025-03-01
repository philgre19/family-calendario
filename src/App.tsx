
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
import NotFound from '@/pages/NotFound';

// Composant pour les routes
function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Chargement...</div>;
  }

  return (
    <Routes>
      {/* Routes sans protection d'authentification */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/tasks" element={<Tasks />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/stats" element={<Stats />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/user-settings" element={<UserSettings />} />
      <Route path="/weather" element={<Weather />} />
      
      {/* Redirection par défaut - pointe directement vers dashboard */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
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
