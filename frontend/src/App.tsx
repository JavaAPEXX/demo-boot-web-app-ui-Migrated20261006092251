import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './styles/modern-ui.css';
import LoginComponent from './LoginComponent';
import Registration from './src/pages/Registration';
import WelcomeComponent from './WelcomeComponent';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="modern-app-root">
        <header className="modern-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontWeight: 700, fontSize: '1.1rem', color: '#2563eb' }}>Modernized Application</span>
          </div>
          <nav style={{ display: 'flex', gap: '1rem' }}>
            <Link to="/" style={{ textDecoration: 'none', color: '#475569', fontWeight: 500 }}>Home</Link>
          </nav>
        </header>
        <main className="modern-main-content">
          <Routes>
        <Route path="/" element={<LoginComponent />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/welcome" element={<WelcomeComponent />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
