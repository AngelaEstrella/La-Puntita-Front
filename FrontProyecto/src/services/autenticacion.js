
export async function login(email, passw) {
    try {
        
        const response = await fetch(`https://proyecto-pds-24-ii-production.up.railway.app/usuarios?email=${encodeURIComponent(email)}&passw=${encodeURIComponent(passw)}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Error en la autenticación");
        }

        const data = await response.json();
        console.log("Respuesta de la API:", data); 

        return data;
    } catch (error) {
        console.error("Error en la solicitud:", error);
        throw error;
    }
}

