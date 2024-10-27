
export async function login(email, passw, telefono, direccion, referencia, nombre, apellido, dni) {
    try {
        const response = await fetch("https://proyecto-pds-24-ii-production.up.railway.app/usuarios", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                telefono,         // Número de teléfono
                email,            // Correo electrónico
                direccion,        // Dirección
                referencia,       // Referencia adicional (puede ser null)
                passw,            // Contraseña
                dni,              // DNI del usuario
                nombre,           // Nombre del usuario
                apellido,         // Apellido del usuario
            }),
        });

        if (!response.ok) {
            throw new Error("Error en la autenticación");
        }

        const data = await response.json();
        console.log("Respuesta de la API:", data); // Para verificar la estructura de la respuesta

        return data;
    } catch (error) {
        console.error("Error en la solicitud:", error);
        throw error;
    }
}





