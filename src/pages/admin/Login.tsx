import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { LogIn, Lock } from 'lucide-react';

export const Login: React.FC = () => {
  const { isAdmin, login } = useAuth();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(password);
    if (!success) {
      setError(true);
    }
  };

  if (isAdmin) {
    return <Navigate to="/admin" />;
  }

  return (
    <div className="container mx-auto px-4 py-24 flex items-center justify-center min-h-[70vh]">
      <div className="max-w-md w-full p-12 bg-muted/30 rounded-3xl text-center space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-display font-bold">Admin Login</h1>
          <p className="text-muted-foreground">
            Enter the password to access the dashboard.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="password"
              placeholder="Enter password"
              className="pl-12 h-14 rounded-full"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
            />
          </div>
          <Button type="submit" size="lg" className="w-full h-14 gap-2 text-lg rounded-full">
            <LogIn className="h-5 w-5" /> Login
          </Button>
          {error && (
            <p className="text-destructive text-sm">
              Incorrect password. Try "admin123"
            </p>
          )}
        </form>
      </div>
    </div>
  );
};
