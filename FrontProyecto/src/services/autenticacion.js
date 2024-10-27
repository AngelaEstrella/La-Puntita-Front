export async function login(correo, contraseña) {
    try {
        const response = await fetch("https://proyecto-pds-24-ii-production.up.railway.app/usuarios", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ correo, contraseña }),
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