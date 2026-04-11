import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeColor, ThemeConfig } from '../types';
import { useData } from './DataContext';

interface ThemeContextType {
  theme: ThemeConfig;
  setThemeColor: (color: ThemeColor) => void;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { profile } = useData();
  const [theme, setTheme] = useState<ThemeConfig>(() => {
    const saved = localStorage.getItem('app-theme');
    return saved ? JSON.parse(saved) : { color: 'zinc', mode: 'dark' };
  });

  // Effect to sync with Admin-defined default theme
  useEffect(() => {
    if (!localStorage.getItem('app-theme')) {
      if (profile?.defaultTheme || profile?.defaultColor) {
        setTheme(prev => ({ 
          ...prev, 
          mode: profile.defaultTheme || prev.mode,
          color: profile.defaultColor || prev.color 
        }));
      }
    }
  }, [profile?.defaultTheme, profile?.defaultColor]);

  useEffect(() => {
    localStorage.setItem('app-theme', JSON.stringify(theme));
    const root = window.document.documentElement;
    
    // Remove old classes
    root.classList.remove('light', 'dark');
    root.classList.add(theme.mode);
    
    // Set data attribute for color theme
    root.setAttribute('data-theme', theme.color);
  }, [theme]);

  const setThemeColor = (color: ThemeColor) => setTheme(prev => ({ ...prev, color }));
  const toggleMode = () => setTheme(prev => ({ ...prev, mode: prev.mode === 'light' ? 'dark' : 'light' }));

  return (
    <ThemeContext.Provider value={{ theme, setThemeColor, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};
