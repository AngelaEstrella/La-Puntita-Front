// import Layout from './components/Layout';
// import BestSeler from './components/BestSeler';

// export default function Home() {

//     return (
//         <>
//             <Layout />
//             <BestSeler />
//         </>
//     );
// }

import React, { useContext, useEffect } from "react";
import Layout from "./components/Layout";
import BestSeler from "./components/BestSeler";
import { AuthContext } from "../../services/AuthContext";
import { useNavigate } from "react-router-dom"; // Importar useNavigate

export default function Home() {
    const { isAuthenticated, setIsAuthenticated, userId, setUserId } = useContext(AuthContext);
    const navigate = useNavigate(); // Inicializar useNavigate

    useEffect(() => {
        // Verificar si hay un userId en localStorage al cargar la página
        const storedUserId = localStorage.getItem("userId");
        if (storedUserId) {
            setIsAuthenticated(true);
            setUserId(storedUserId);
        } else {
            // Si no hay userId, redirigir a la página de login
            navigate("/login");
        }
    }, [setIsAuthenticated, setUserId, navigate]); // Asegúrate de agregar navigate a las dependencias

    return (
        <>
            <Layout />
            <BestSeler />
        </>
    );
}

