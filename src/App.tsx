import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Wallet, PieChart, TrendingUp, Settings, Menu } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register.tsx';
import Landing from './pages/Landing.tsx';
import Sidebar from './components/Sidebar';
import { useAuthStore } from './store/authStore';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <Router>
      <div className="flex min-h-screen bg-gray-50">
        {isAuthenticated && <Sidebar />}
        <main className={`flex-1 ${isAuthenticated ? 'p-8' : ''}`}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;