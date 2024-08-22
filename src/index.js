import React from 'react';
import ReactDOM from 'react-dom/client';  // Używamy 'react-dom/client' dla React 18
import App from './App';
import './index.css';  // Importowanie stylów CSS

const root = ReactDOM.createRoot(document.getElementById('root'));  // Tworzymy korzeń aplikacji
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);