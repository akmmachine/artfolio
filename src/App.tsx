/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Portfolio } from './pages/Portfolio';
import { BlogPage } from './pages/BlogPage';
import { BlogDetail } from './pages/BlogDetail';
import { Contact } from './pages/Contact';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { Login } from './pages/admin/Login';
import { ScrollArea } from './components/ui/scroll-area';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DataProvider>
          <Router>
            <div className="min-h-screen bg-background text-foreground flex flex-col">
              <Navbar />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/portfolio" element={<Portfolio />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/blog/:id" element={<BlogDetail />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/login" element={<Login />} />
                </Routes>
              </main>
              <footer className="border-t py-12 bg-muted/20">
              <div className="container mx-auto px-4 text-center">
                <p className="text-2xl font-display font-bold mb-4 tracking-tighter">
                  ART<span className="text-primary">FOLIO</span>
                </p>
                <p className="text-muted-foreground text-sm">
                  © {new Date().getFullYear()} ArtFolio. All rights reserved.
                </p>
                <div className="mt-4">
                  <Link to="/admin" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                    Admin Dashboard
                  </Link>
                </div>
              </div>
            </footer>
          </div>
        </Router>
      </DataProvider>
    </AuthProvider>
  </ThemeProvider>
  );
}
