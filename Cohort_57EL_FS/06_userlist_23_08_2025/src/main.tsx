import './i18n';
import React, { StrictMode, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css';
import App from './App';
import { ThemeContext } from './ThemeContext';

export const Root = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  return (
    <StrictMode>
      <BrowserRouter>
        <ThemeContext.Provider value={{ theme, setTheme }}>
          <App />
        </ThemeContext.Provider>
      </BrowserRouter>
    </StrictMode>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<Root />);
}

