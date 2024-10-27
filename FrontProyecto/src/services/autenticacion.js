
export async function login(email, passw) {
    try {
        const response = await fetch("https://proyecto-pds-24-ii-production.up.railway.app/usuarios", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, passw }),
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

