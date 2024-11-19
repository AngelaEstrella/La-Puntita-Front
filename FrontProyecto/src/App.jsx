import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ResponsiveAppBar from './components/Appbar';
import Inicio from './pages/Home/Home';
import Login from './components/Login';
import Carta from './pages/Carta/Carta';
import Contacto from './pages/Contacto/Contacto';
import Register from './components/Register';
import { AuthProvider } from './services/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/*<Route path="/validate" element={<Validate />} />*/}
            <Route
              path="/*"
              element={
                <>
                  <ResponsiveAppBar />
                  <Routes>
                    <Route path="/" element={<Inicio />} />
                    <Route path="/carta" element={<Carta />} />
                    <Route path="/contacto" element={<Contacto />} />
                    <Route path="/ventas" element={<h1>Ventas</h1>} />
                    {/* Rutas para Delivery y Recojo en tienda */}
                    <Route path="/delivery" element={<h1>Delivery</h1>} />
                    <Route path="/pickup" element={<h1>Login</h1>} />
                  </Routes>
                </>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}
