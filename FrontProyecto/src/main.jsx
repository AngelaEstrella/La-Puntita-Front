import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './main.css'; // Importamos el archivo CSS global para aplicar estilos

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
