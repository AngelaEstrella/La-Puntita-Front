
export async function login(email, passw) { // Cambiar nombres a los que usa la API
    try {
        const response = await fetch("https://proyecto-pds-24-ii-production.up.railway.app/usuarios", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, passw }), // Enviar email y passw en lugar de correo y contraseña
        });

        if (!response.ok) {
            throw new Error("Error en la autenticación");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error en la solicitud:", error);
        throw error;
    }
}
