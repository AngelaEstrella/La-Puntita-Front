import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './main.css'; // Importamos el archivo CSS global para aplicar estilos
import PromocionBebidas from './components/PromocionBebidas';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <PromocionBebidas />
  </StrictMode>
);
