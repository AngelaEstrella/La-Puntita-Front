import { createContext, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticación
    const [userId, setUserId] = useState(null); // ID del usuario autenticado

    // // Login: Establece autenticación y guarda el userId en localStorage
    // const login = (id) => {
    //     setIsAuthenticated(true);
    //     setUserId(id);
    //     localStorage.setItem("userId", id); // Guardar en localStorage
    // };

    // //Efecto para inicializar la autenticación desde el localStorage
    // useEffect(() => {
    //     const storedUserId = localStorage.getItem("userId");
    //     if (storedUserId) {
    //     setIsAuthenticated(true);
    //     setUserId(storedUserId);
    //     };
    // }, [])

    

    const logout = () => {
        setIsAuthenticated(false); // Cambiar estado de autenticación
        setUserId(null); // Limpia el ID de usuario
    };
    
    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, userId, setUserId,logout }}>
            {children}
        </AuthContext.Provider>
    );
}