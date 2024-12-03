import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticación
    const [userId, setUserId] = useState(null); // ID del usuario autenticado

    //useffect nuevo
    // Verificar el estado de la sesión al cargar la página
    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        const storedAuthStatus = localStorage.getItem('isAuthenticated');

        if (storedAuthStatus === 'true' && storedUserId) {
            setIsAuthenticated(true);
            setUserId(storedUserId);
        } else {
            setIsAuthenticated(false); // Asegura que se marque como no autenticado si no hay datos
        }
    }, []);

    const logout = () => {
        setIsAuthenticated(false); // Cambiar estado de autenticación
        setUserId(null); // Limpia el ID de usuario

        //nuevas lineas
        localStorage.removeItem('userId'); // Elimina el userId de localStorage
        localStorage.removeItem('isAuthenticated'); // Elimina el estado de autenticación
    };
    
    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, userId, setUserId,logout }}>
            {children}
        </AuthContext.Provider>
    );
}