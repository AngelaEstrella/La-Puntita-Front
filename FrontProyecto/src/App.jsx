import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ResponsiveAppBar from './components/Appbar';
import Inicio from './pages/Home/Home';
import Login from './components/Login';
import Carta from './pages/Carta/Carta';

export default function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <>
                <ResponsiveAppBar />
                <Routes>
                  <Route path="/" element={<Inicio />} />
                  <Route path="/carta" element={<Carta />} />
                  <Route path="/ventas" element={<h1>Ventas</h1>} />
                  {/* Rutas para Delivery y Recojo en tienda */}
                  <Route path="/delivery" element={<h1>Delivery</h1>} />
                  <Route path="/pickup" element={<h1>Recojo en tienda</h1>} />
                </Routes>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}
