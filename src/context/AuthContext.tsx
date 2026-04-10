import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  user: { email: string } | null;
  isAdmin: boolean;
  loading: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = localStorage.getItem('admin_session');
    if (session === 'true') {
      setUser({ email: 'admin@artfolio.com' });
      setIsAdmin(true);
    }
    setLoading(false);
  }, []);

  const login = (password: string) => {
    // Simple hardcoded password for demonstration
    if (password === 'admin123') {
      setUser({ email: 'admin@artfolio.com' });
      setIsAdmin(true);
      localStorage.setItem('admin_session', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem('admin_session');
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
